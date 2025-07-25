"use client"

import type React from "react"

import { useState, useEffect } from "react"
import AdminLayout from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Edit, Trash2, AlertCircle, CheckCircle, Briefcase } from "lucide-react"
import { getPortfolioItems, addPortfolioItem, updatePortfolioItem, deletePortfolioItem } from "@/lib/admin"

interface PortfolioItem {
  id: string
  title: string
  description: string
  image: string
  technologies: string[]
  category: string
  client: string
  year: string
  status: string
  projectUrl?: string
  githubUrl?: string
}

export default function PortfolioManagement() {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    technologies: "",
    category: "Web Development",
    client: "",
    year: new Date().getFullYear().toString(),
    status: "completed",
    projectUrl: "",
    githubUrl: "",
  })
  const [message, setMessage] = useState({ type: "", text: "" })

  useEffect(() => {
    fetchPortfolioItems()
  }, [])

  const fetchPortfolioItems = async () => {
    try {
      const portfolioData = await getPortfolioItems()
      setPortfolioItems(portfolioData as PortfolioItem[])
    } catch (error) {
      console.error("Error fetching portfolio items:", error)
      setMessage({ type: "error", text: "Failed to fetch portfolio items" })
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const portfolioData = {
        ...formData,
        technologies: formData.technologies
          .split(",")
          .map((tech) => tech.trim())
          .filter((tech) => tech !== ""),
      }

      if (editingItem) {
        await updatePortfolioItem(editingItem.id, portfolioData)
        setMessage({ type: "success", text: "Portfolio item updated successfully!" })
      } else {
        await addPortfolioItem(portfolioData)
        setMessage({ type: "success", text: "Portfolio item added successfully!" })
      }

      setIsDialogOpen(false)
      setEditingItem(null)
      resetForm()
      fetchPortfolioItems()
    } catch (error) {
      console.error("Error saving portfolio item:", error)
      setMessage({ type: "error", text: "Failed to save portfolio item" })
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (item: PortfolioItem) => {
    setEditingItem(item)
    setFormData({
      title: item.title,
      description: item.description,
      image: item.image,
      technologies: item.technologies.join(", "),
      category: item.category,
      client: item.client,
      year: item.year,
      status: item.status,
      projectUrl: item.projectUrl || "",
      githubUrl: item.githubUrl || "",
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (itemId: string) => {
    if (!confirm("Are you sure you want to delete this portfolio item?")) return

    try {
      await deletePortfolioItem(itemId)
      setMessage({ type: "success", text: "Portfolio item deleted successfully!" })
      fetchPortfolioItems()
    } catch (error) {
      console.error("Error deleting portfolio item:", error)
      setMessage({ type: "error", text: "Failed to delete portfolio item" })
    }
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      image: "",
      technologies: "",
      category: "Web Development",
      client: "",
      year: new Date().getFullYear().toString(),
      status: "completed",
      projectUrl: "",
      githubUrl: "",
    })
  }

  const openAddDialog = () => {
    setEditingItem(null)
    resetForm()
    setIsDialogOpen(true)
  }

  return (
    <AdminLayout title="Portfolio Management">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Portfolio</h2>
            <p className="text-gray-600">Manage your portfolio projects</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={openAddDialog}>
                <Plus className="h-4 w-4 mr-2" />
                Add Project
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingItem ? "Edit Project" : "Add New Project"}</DialogTitle>
                <DialogDescription>
                  {editingItem ? "Update project information" : "Add a new project to your portfolio"}
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Project Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="client">Client</Label>
                    <Input
                      id="client"
                      value={formData.client}
                      onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <select
                      id="category"
                      className="w-full p-2 border rounded-md"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                      <option value="Web Development">Web Development</option>
                      <option value="Mobile Development">Mobile Development</option>
                      <option value="Data Analytics">Data Analytics</option>
                      <option value="UI/UX Design">UI/UX Design</option>
                      <option value="E-commerce">E-commerce</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="year">Year</Label>
                    <Input
                      id="year"
                      type="number"
                      min="2020"
                      max="2030"
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <select
                      id="status"
                      className="w-full p-2 border rounded-md"
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    >
                      <option value="completed">Completed</option>
                      <option value="in-progress">In Progress</option>
                      <option value="draft">Draft</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="technologies">Technologies (comma-separated)</Label>
                  <Input
                    id="technologies"
                    placeholder="React, Node.js, MongoDB, AWS"
                    value={formData.technologies}
                    onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="projectUrl">Project URL (optional)</Label>
                    <Input
                      id="projectUrl"
                      type="url"
                      placeholder="https://project-demo.com"
                      value={formData.projectUrl}
                      onChange={(e) => setFormData({ ...formData, projectUrl: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="githubUrl">GitHub URL (optional)</Label>
                    <Input
                      id="githubUrl"
                      type="url"
                      placeholder="https://github.com/username/repo"
                      value={formData.githubUrl}
                      onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? "Saving..." : editingItem ? "Update Project" : "Add Project"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Messages */}
        {message.text && (
          <Alert className={message.type === "error" ? "border-red-500" : "border-green-500"}>
            {message.type === "error" ? <AlertCircle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
            <AlertDescription>{message.text}</AlertDescription>
          </Alert>
        )}

        {/* Portfolio Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                <CardHeader>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-20 bg-gray-200 rounded mb-4"></div>
                  <div className="h-8 bg-gray-200 rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolioItems.map((item) => (
              <Card key={item.id} className="hover:shadow-lg transition-shadow overflow-hidden">
                <div className="relative h-48 bg-gray-100">
                  {item.image ? (
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <Briefcase className="h-12 w-12" />
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <Badge>{item.category}</Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge
                      variant={
                        item.status === "completed"
                          ? "default"
                          : item.status === "in-progress"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {item.status}
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <CardDescription>
                    {item.client} • {item.year}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">{item.description}</p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {item.technologies.slice(0, 3).map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {item.technologies.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{item.technologies.length - 3}
                      </Badge>
                    )}
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(item)}
                      className="flex-1 bg-transparent"
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 bg-transparent"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {portfolioItems.length === 0 && !loading && (
          <Card>
            <CardContent className="text-center py-12">
              <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No projects yet</h3>
              <p className="text-gray-600 mb-4">Get started by adding your first portfolio project</p>
              <Button onClick={openAddDialog}>
                <Plus className="h-4 w-4 mr-2" />
                Add Project
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  )
}
