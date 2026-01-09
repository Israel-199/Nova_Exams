import { useState } from "react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Upload, Pencil, Trash2, FileText, Video } from "lucide-react";
import {
  useResources,
  useAddResource,
  useUpdateResource,
  useDeleteResource,
} from "@/hooks/useResources";
import { Resource } from "@/types/admin";

const ResourcesPage = () => {
  const { data: resources = [], isLoading } = useResources();
  const addResource = useAddResource();
  const updateResource = useUpdateResource();
  const deleteResource = useDeleteResource();

  const [resourceDialogOpen, setResourceDialogOpen] = useState(false);
  const [editingResource, setEditingResource] = useState<Resource | null>(null);

  const [resourceForm, setResourceForm] = useState<{
    type: "pdf" | "video";
    title: string;
    description: string;
    url: string;
    videoType: "youtube" | "social" | "upload";
    videoFile: File | null;
    pdfFile: File | null;
    pdfUploadMode: "url" | "upload";
  }>({
    type: "pdf",
    title: "",
    description: "",
    url: "",
    videoType: "youtube",
    videoFile: null,
    pdfFile: null,
    pdfUploadMode: "url",
  });

  const handlePdfFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setResourceForm({ ...resourceForm, pdfFile: file });
  };

  const handleVideoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setResourceForm({ ...resourceForm, videoFile: file });
  };

  const handleSaveResource = () => {
    const payload: Partial<Resource> = {
      type: resourceForm.type,
      title: resourceForm.title,
      description: resourceForm.description,
      url: resourceForm.url,
      videoType: resourceForm.type === "video" ? resourceForm.videoType : undefined,
      pdfUploadMode: resourceForm.type === "pdf" ? resourceForm.pdfUploadMode : undefined,
      pdfFile: resourceForm.pdfFile ?? undefined,
      videoFile: resourceForm.videoFile ?? undefined,
    };

    if (editingResource) {
      updateResource.mutate(
        { id: editingResource.id, resourceData: payload },
        { onSuccess: () => setResourceDialogOpen(false) }
      );
    } else {
      addResource.mutate(payload, { onSuccess: () => setResourceDialogOpen(false) });
    }
  };

  const handleDeleteResource = (id: string) => {
    deleteResource.mutate(id);
  };

  const pdfResources = resources.filter((r) => r.type === "pdf");
  const videoResources = resources.filter((r) => r.type === "video");

  return (
    <Card className="bg-white">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-neutral-dark">Manage Resources</h2>
          <Dialog open={resourceDialogOpen} onOpenChange={setResourceDialogOpen}>
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
                <DialogTitle>{editingResource ? "Edit Resource" : "Add New Resource"}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                {/* Resource Type */}
                <div>
                  <Label>Resource Type</Label>
                  <Select
                    value={resourceForm.type}
                    onValueChange={(value: "pdf" | "video") =>
                      setResourceForm({ ...resourceForm, type: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF Document</SelectItem>
                      <SelectItem value="video">Video</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Title */}
                <div>
                  <Label>Title</Label>
                  <Input
                    value={resourceForm.title}
                    onChange={(e) => setResourceForm({ ...resourceForm, title: e.target.value })}
                    placeholder="Resource title"
                  />
                </div>

                {/* Description */}
                <div>
                  <Label>Description</Label>
                  <Input
                    value={resourceForm.description}
                    onChange={(e) => setResourceForm({ ...resourceForm, description: e.target.value })}
                    placeholder="Brief description"
                  />
                </div>

                {/* PDF Source Selector */}
                {resourceForm.type === "pdf" && (
                  <div>
                    <Label>PDF Source</Label>
                    <Select
                      value={resourceForm.pdfUploadMode}
                      onValueChange={(value: "url" | "upload") =>
                        setResourceForm({ ...resourceForm, pdfUploadMode: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="url">URL Link</SelectItem>
                        <SelectItem value="upload">Upload File</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* PDF Conditional Upload or URL */}
                {resourceForm.type === "pdf" && resourceForm.pdfUploadMode === "upload" ? (
                  <div>
                    <Label>Upload PDF File</Label>
                    <div className="mt-2">
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-muted-foreground/30 rounded-lg cursor-pointer hover:bg-muted/10 transition-colors">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                          {resourceForm.pdfFile ? (
                            <p className="text-sm text-primary font-medium">{resourceForm.pdfFile.name}</p>
                          ) : (
                            <>
                              <p className="mb-1 text-sm text-muted-foreground">
                                <span className="font-semibold">Click to upload</span> or drag and drop
                              </p>
                              <p className="text-xs text-muted-foreground">PDF files only (MAX. 50MB)</p>
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
                ) : resourceForm.type === "pdf" && resourceForm.pdfUploadMode === "url" ? (
                  <div>
                    <Label>PDF URL</Label>
                    <Input
                      value={resourceForm.url}
                      onChange={(e) => setResourceForm({ ...resourceForm, url: e.target.value })}
                      placeholder="https://example.com/file.pdf"
                    />
                  </div>
                ) : null}

                {/* Video Source Selector */}
                {resourceForm.type === "video" && (
                  <div>
                    <Label>Video Source</Label>
                    <Select
                      value={resourceForm.videoType}
                      onValueChange={(value: "youtube" | "social" | "upload") =>
                        setResourceForm({ ...resourceForm, videoType: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="youtube">YouTube Link</SelectItem>
                        <SelectItem value="social">Social Media Link</SelectItem>
                        <SelectItem value="upload">Upload File</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                               {/* Video Conditional Upload or URL */}
                {resourceForm.type === "video" && resourceForm.videoType === "upload" ? (
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
                                <span className="font-semibold">Click to upload</span> or drag and drop
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
                ) : resourceForm.type === "video" ? (
                  <div>
                    <Label>Video URL</Label>
                    <Input
                      value={resourceForm.url}
                      onChange={(e) =>
                        setResourceForm({
                          ...resourceForm,
                          url: e.target.value,
                        })
                      }
                      placeholder="https://youtube.com/watch?v=..."
                    />
                  </div>
                ) : null}

                {/* Save Button */}
                <Button onClick={handleSaveResource} className="w-full">
                  {editingResource ? "Update Resource" : "Add Resource"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Tables */}
        <div className="space-y-6">
          {/* PDF Table */}
          <div>
            <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
              <FileText className="w-5 h-5" /> PDF Documents ({pdfResources.length})
            </h3>
            <table className="w-full">
              <tbody>
                {pdfResources.map((r) => (
                  <tr key={r.id}>
                    <td>{r.title}</td>
                    <td>{r.description}</td>
                    <td>{r.pdfUploadMode}</td>
                    <td>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => {
                          setEditingResource(r);
                          setResourceForm({
                            type: r.type,
                            title: r.title,
                            description: r.description,
                            url: r.url,
                            videoType: r.videoType || "youtube",
                            videoFile: null,
                            pdfFile: null,
                            pdfUploadMode: r.pdfUploadMode || "url",
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
                        onClick={() => handleDeleteResource(r.id)}
                        className="h-8 w-8"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Video Table */}
          <div>
            <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
              <Video className="w-5 h-5" /> Videos ({videoResources.length})
            </h3>
            <table className="w-full">
              <tbody>
                {videoResources.map((r) => (
                  <tr key={r.id}>
                    <td>{r.title}</td>
                    <td>{r.description}</td>
                    <td>{r.videoType}</td>
                    <td>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => {
                          setEditingResource(r);
                          setResourceForm({
                            type: r.type,
                            title: r.title,
                            description: r.description,
                            url: r.url,
                            videoType: r.videoType || "youtube",
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
                        size="icon"
                        variant="destructive"
                        onClick={() => handleDeleteResource(r.id)}
                        className="h-8 w-8"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResourcesPage;
