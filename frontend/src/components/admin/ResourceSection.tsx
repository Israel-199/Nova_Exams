import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil, Trash2, FileText, Video, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Resource } from "@/types/admin";
import {
  useResources,
  useAddResource,
  useUpdateResource,
  useDeleteResource,
} from "@/hooks/useResources";

const ResourcesSection = () => {
  const [resourceDialogOpen, setResourceDialogOpen] = useState(false);
  const [editingResource, setEditingResource] = useState<Resource | null>(null);
 const [resourceForm, setResourceForm] = useState<{
  type: "pdf" | "video";
  title: string;
  description: string;
  url: string;
  videoType: "youtube" | "vimeo" | "social" | "upload";
  pdfUploadMode: "url" | "file" | "upload";
}>({
  type: "pdf",
  title: "",
  description: "",
  url: "",
  videoType: "youtube",
  pdfUploadMode: "url",
});


  const { toast } = useToast();

  const { data: resources = [], isLoading } = useResources();
  const addResource = useAddResource();
  const updateResource = useUpdateResource();
  const deleteResource = useDeleteResource();

  const handleSaveResource = () => {
  const resourceData: Partial<Resource> = {
    type: resourceForm.type as "pdf" | "video",
    title: resourceForm.title,
    description: resourceForm.description,
    url: resourceForm.url,
    videoType: resourceForm.videoType as "youtube" | "vimeo",
    pdfUploadMode: resourceForm.pdfUploadMode as "url" | "file",
  };

  if (editingResource) {
    updateResource.mutate(
      { id: editingResource.id, resourceData },
      {
        onSuccess: () => {
          toast({ title: "Resource updated successfully!" });
          setResourceDialogOpen(false);
          setEditingResource(null);
        },
        onError: () => toast({ title: "Failed to update resource" }),
      }
    );
  } else {
    addResource.mutate(resourceData, {
      onSuccess: () => {
        toast({ title: "Resource added successfully!" });
        setResourceDialogOpen(false);
      },
      onError: () => toast({ title: "Failed to add resource" }),
    });
  }
};


  const handleDeleteResource = (id: string) => {
    deleteResource.mutate(id, {
      onSuccess: () => toast({ title: "Resource deleted successfully!" }),
      onError: () => toast({ title: "Failed to delete resource" }),
    });
  };

  const pdfResources = resources.filter((r) => r.type === "pdf");
  const videoResources = resources.filter((r) => r.type === "video");

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Manage Resources</CardTitle>
        <Dialog open={resourceDialogOpen} onOpenChange={setResourceDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditingResource(null);
                setResourceForm({
                  type: "pdf",
                  title: "",
                  description: "",
                  url: "",
                  videoType: "youtube",
                  pdfUploadMode: "url",
                });
              }}
              className="gap-2"
            >
              <Plus className="h-4 w-4" /> Add Resource
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card">
            <DialogHeader>
              <DialogTitle>
                {editingResource ? "Edit Resource" : "Add New Resource"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={resourceForm.title}
                  onChange={(e) =>
                    setResourceForm({ ...resourceForm, title: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={resourceForm.description}
                  onChange={(e) =>
                    setResourceForm({
                      ...resourceForm,
                      description: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="url">URL</Label>
                <Input
                  id="url"
                  value={resourceForm.url}
                  onChange={(e) =>
                    setResourceForm({ ...resourceForm, url: e.target.value })
                  }
                  placeholder={
                    resourceForm.type === "pdf"
                      ? "https://example.com/file.pdf"
                      : "https://youtube.com/watch?v=..."
                  }
                  required
                />
              </div>
              <Button
                onClick={handleSaveResource}
                className="w-full"
                disabled={addResource.isPending || updateResource.isPending}
              >
                {addResource.isPending || updateResource.isPending
                  ? "Saving..."
                  : editingResource
                  ? "Update Resource"
                  : "Add Resource"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p className="text-muted-foreground text-center">
            Loading resources...
          </p>
        ) : (
          <div className="space-y-6">
            {/* PDF Resources */}
            <div>
              <h3 className="text-lg font-medium text-foreground mb-3 flex items-center gap-2">
                <FileText className="w-5 h-5" /> PDF Documents (
                {pdfResources.length})
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 text-muted-foreground font-medium">
                        Title
                      </th>
                      <th className="text-left py-3 px-4 text-muted-foreground font-medium">
                        Description
                      </th>
                      <th className="text-right py-3 px-4 text-muted-foreground font-medium">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {pdfResources.map((resource) => (
                      <tr
                        key={resource.id}
                        className="border-b hover:bg-muted/5"
                      >
                        <td className="py-4 px-4 font-medium">
                          {resource.title}
                        </td>
                        <td className="py-4 px-4">{resource.description}</td>
                        <td className="py-4 px-4">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => {
                                setEditingResource(resource);
                                setResourceForm({
                                  type: resource.type,
                                  title: resource.title,
                                  description: resource.description,
                                  url: resource.url,
                                  videoType: resource.videoType || "youtube",
                                  pdfUploadMode: resource.pdfUploadMode || "url",
                                });
                                setResourceDialogOpen(true);
                              }}
                              className="h-8 w-8"
                            >
                              <Pencil className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="destructive"
                              size="icon"
                              onClick={() => handleDeleteResource(resource.id)}
                              disabled={deleteResource.isPending}
                              className="h-8 w-8"
                            >
                              {deleteResource.isPending ? (
                                <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                              ) : (
                                <Trash2 className="w-4 h-4" />
                              )}
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Video Resources */}
            <div>
              <h3 className="text-lg font-medium text-foreground mb-3 flex items-center gap-2">
                <Video className="w-5 h-5" /> Videos ({videoResources.length})
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 text-muted-foreground font-medium">
                        Title
                      </th>
                      <th className="text-left py-3 px-4 text-muted-foreground font-medium">
                        Description
                      </th>
                      <th className="text-left py-3 px-4 text-muted-foreground font-medium">
                        Source
                      </th>
                      <th className="text-right py-3 px-4 text-muted-foreground font-medium">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {videoResources.map((resource) => (
                      <tr
                        key={resource.id}
                        className="border-b hover:bg-muted/5"
                      >
                        <td className="py-4 px-4 font-medium">
                          {resource.title}
                        </td>
                        <td className="py-4 px-4">{resource.description}</td>
                        <td className="py-4 px-4 capitalize">
                          {resource.videoType}
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => {
                                setEditingResource(resource);
                                setResourceForm({
                                  type: resource.type,
                                  title: resource.title,
                                  description: resource.description,
                                  url: resource.url,
                                  videoType: resource.videoType || "youtube",
                                  pdfUploadMode: "url",
                                });
                                setResourceDialogOpen(true);
                              }}
                              className="h-8 w-8"
                            >
                              <Pencil className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="destructive"
                              size="icon"
                              onClick={() => handleDeleteResource(resource.id)}
                              disabled={deleteResource.isPending}
                              className="h-8 w-8"
                            >
                              {deleteResource.isPending ? (
                                <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                              ) : (
                                <Trash2 className="w-4 h-4" />
                              )}
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ResourcesSection;
