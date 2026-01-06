import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Pencil, Trash2, Upload, FileText, Video } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Resource } from "@/types/admin";

interface ResourcesSectionProps {
  resources: Resource[];
  setResources: React.Dispatch<React.SetStateAction<Resource[]>>;
}

const ResourcesSection = ({ resources, setResources }: ResourcesSectionProps) => {
  const [resourceDialogOpen, setResourceDialogOpen] = useState(false);
  const [editingResource, setEditingResource] = useState<Resource | null>(null);
  const [resourceForm, setResourceForm] = useState({
    type: "pdf" as "pdf" | "video",
    title: "",
    description: "",
    url: "",
    videoType: "youtube" as "youtube" | "social" | "upload",
    videoFile: null as File | null,
    pdfFile: null as File | null,
    pdfUploadMode: "url" as "url" | "upload",
  });

  const { toast } = useToast();

  const handleVideoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const videoUrl = URL.createObjectURL(file);
      setResourceForm({ ...resourceForm, videoFile: file, url: videoUrl });
    }
  };

  const handlePdfFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const pdfUrl = URL.createObjectURL(file);
      setResourceForm({ ...resourceForm, pdfFile: file, url: pdfUrl });
    }
  };

  const handleAddResource = () => {
    if (!resourceForm.title || !resourceForm.description) {
      toast({ title: "Please fill all fields", variant: "destructive" });
      return;
    }

    if (editingResource) {
      setResources(
        resources.map((r) =>
          r.id === editingResource.id ? { ...r, ...resourceForm } : r
        )
      );
      toast({ title: "Resource updated successfully" });
    } else {
      setResources([
        ...resources,
        { id: Date.now().toString(), ...resourceForm },
      ]);
      toast({ title: "Resource added successfully" });
    }

    setResourceForm({
      type: "pdf",
      title: "",
      description: "",
      url: "",
      videoType: "youtube",
      videoFile: null,
      pdfFile: null,
      pdfUploadMode: "url",
    });
    setEditingResource(null);
    setResourceDialogOpen(false);
  };

  const handleDeleteResource = (id: string) => {
    setResources(resources.filter((r) => r.id !== id));
    toast({ title: "Resource deleted" });
  };

  const pdfResources = resources.filter((r) => r.type === "pdf");
  const videoResources = resources.filter((r) => r.type === "video");

  return (
    <Card className="bg-white">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-neutral-dark">
            Manage Resources
          </h2>
          <Dialog
            open={resourceDialogOpen}
            onOpenChange={setResourceDialogOpen}
          >
            <DialogTrigger asChild>
              <Button
                className="bg-accent text-accent-foreground hover:bg-accent/90"
                onClick={() => {
                  setEditingResource(null);
                  setResourceForm({
                    type: "pdf",
                    title: "",
                    description: "",
                    url: "",
                    videoType: "youtube",
                    videoFile: null,
                    pdfFile: null,
                    pdfUploadMode: "url",
                  });
                }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Resource
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white">
              <DialogHeader>
                <DialogTitle>
                  {editingResource
                    ? "Edit Resource"
                    : "Add New Resource"}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <Label>Resource Type</Label>
                  <Select
                    value={resourceForm.type}
                    onValueChange={(value: "pdf" | "video") =>
                      setResourceForm({
                        ...resourceForm,
                        type: value,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">
                        PDF Document
                      </SelectItem>
                      <SelectItem value="video">Video</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Title</Label>
                  <Input
                    value={resourceForm.title}
                    onChange={(e) =>
                      setResourceForm({
                        ...resourceForm,
                        title: e.target.value,
                      })
                    }
                    placeholder="Resource title"
                  />
                </div>
                <div>
                  <Label>Description</Label>
                  <Input
                    value={resourceForm.description}
                    onChange={(e) =>
                      setResourceForm({
                        ...resourceForm,
                        description: e.target.value,
                      })
                    }
                    placeholder="Brief description"
                  />
                </div>
                {resourceForm.type === "pdf" && (
                  <div>
                    <Label>PDF Source</Label>
                    <Select
                      value={resourceForm.pdfUploadMode}
                      onValueChange={(value: "url" | "upload") =>
                        setResourceForm({
                          ...resourceForm,
                          pdfUploadMode: value,
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="url">URL Link</SelectItem>
                        <SelectItem value="upload">
                          Upload File
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
                {resourceForm.type === "video" && (
                  <div>
                    <Label>Video Source</Label>
                    <Select
                      value={resourceForm.videoType}
                      onValueChange={(
                        value: "youtube" | "social" | "upload"
                      ) =>
                        setResourceForm({
                          ...resourceForm,
                          videoType: value,
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="youtube">
                          YouTube Link
                        </SelectItem>
                        <SelectItem value="social">
                          Social Media Link
                        </SelectItem>
                        <SelectItem value="upload">
                          Upload File
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
                {resourceForm.type === "pdf" &&
                resourceForm.pdfUploadMode === "upload" ? (
                  <div>
                    <Label>Upload PDF File</Label>
                    <div className="mt-2">
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-muted-foreground/30 rounded-lg cursor-pointer hover:bg-muted/10 transition-colors">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                          {resourceForm.pdfFile ? (
                            <p className="text-sm text-primary font-medium">
                              {resourceForm.pdfFile.name}
                            </p>
                          ) : (
                            <>
                              <p className="mb-1 text-sm text-muted-foreground">
                                <span className="font-semibold">
                                  Click to upload
                                </span>{" "}
                                or drag and drop
                              </p>
                              <p className="text-xs text-muted-foreground">
                                PDF files only (MAX. 50MB)
                              </p>
                            </>
                          )}
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          accept=".pdf,application/pdf"
                          onChange={handlePdfFileChange}
                        />
                      </label>
                    </div>
                  </div>
                ) : resourceForm.type === "video" &&
                  resourceForm.videoType === "upload" ? (
                  <div>
                    <Label>Upload Video File</Label>
                    <div className="mt-2">
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-muted-foreground/30 rounded-lg cursor-pointer hover:bg-muted/10 transition-colors">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                          {resourceForm.videoFile ? (
                            <p className="text-sm text-primary font-medium">
                              {resourceForm.videoFile.name}
                            </p>
                          ) : (
                            <>
                              <p className="mb-1 text-sm text-muted-foreground">
                                <span className="font-semibold">
                                  Click to upload
                                </span>{" "}
                                or drag and drop
                              </p>
                              <p className="text-xs text-muted-foreground">
                                MP4, WebM, MOV (MAX. 100MB)
                              </p>
                            </>
                          )}
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          accept="video/*"
                          onChange={handleVideoFileChange}
                        />
                      </label>
                    </div>
                  </div>
                ) : (
                  <div>
                    <Label>
                      {resourceForm.type === "pdf"
                        ? "PDF URL"
                        : "Video URL"}
                    </Label>
                    <Input
                      value={resourceForm.url}
                      onChange={(e) =>
                        setResourceForm({
                          ...resourceForm,
                          url: e.target.value,
                        })
                      }
                      placeholder={
                        resourceForm.type === "pdf"
                          ? "https://example.com/file.pdf"
                          : "https://youtube.com/watch?v=..."
                      }
                    />
                  </div>
                )}
                <Button onClick={handleAddResource} className="w-full">
                  {editingResource ? "Update Resource" : "Add Resource"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-6">
          {/* PDF Resources */}
          <div>
            <h3 className="text-lg font-medium text-foreground mb-3 flex items-center gap-2">
              <FileText className="w-5 h-5" /> PDF Documents ({pdfResources.length})
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">Title</th>
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">Description</th>
                    <th className="text-right py-3 px-4 text-muted-foreground font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pdfResources.map((resource) => (
                    <tr key={resource.id} className="border-b hover:bg-muted/5">
                      <td className="py-4 px-4 font-medium">{resource.title}</td>
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
                                videoFile: null,
                                pdfFile: null,
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
                            className="h-8 w-8"
                          >
                            <Trash2 className="w-4 h-4" />
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
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">Title</th>
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">Description</th>
                    <th className="text-left py-3 px-4 text-muted-foreground font-medium">Source</th>
                    <th className="text-right py-3 px-4 text-muted-foreground font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {videoResources.map((resource) => (
                    <tr key={resource.id} className="border-b hover:bg-muted/5">
                      <td className="py-4 px-4 font-medium">{resource.title}</td>
                      <td className="py-4 px-4">{resource.description}</td>
                      <td className="py-4 px-4 capitalize">{resource.videoType}</td>
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
                                videoFile: null,
                                pdfFile: null,
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
                            className="h-8 w-8"
                          >
                            <Trash2 className="w-4 h-4" />
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
      </CardContent>
    </Card>
  );
};

export default ResourcesSection;