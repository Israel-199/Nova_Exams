import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, MessageSquare, FileText, Book } from "lucide-react";

interface AdminStatsProps {
  examsCount: number;
  testimonialsCount: number;
  blogPostsCount: number;
  resourcesCount: number;
}

const AdminStats = ({ examsCount, testimonialsCount, blogPostsCount, resourcesCount }: AdminStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total Exams
          </CardTitle>
          <DollarSign className="h-5 w-5 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-foreground">
            {examsCount}
          </div>
        </CardContent>
      </Card>
      <Card className="bg-gradient-to-br from-magenta/10 to-magenta/5 border-magenta/20">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Testimonials
          </CardTitle>
          <MessageSquare className="h-5 w-5 text-magenta" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-foreground">
            {testimonialsCount}
          </div>
        </CardContent>
      </Card>
      <Card className="bg-gradient-to-br from-indigo/10 to-indigo/5 border-indigo/20">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Blog Posts
          </CardTitle>
          <FileText className="h-5 w-5 text-indigo" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-foreground">
            {blogPostsCount}
          </div>
        </CardContent>
      </Card>
      <Card className="bg-gradient-to-br from-indigo/10 to-indigo/5 border-indigo/20">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Resources
          </CardTitle>
          <Book className="h-5 w-5 text-indigo" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-foreground">
            {resourcesCount}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminStats;
