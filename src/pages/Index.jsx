import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { NavLink } from "react-router-dom";

const Index = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl">Welcome to Survey Designer</CardTitle>
          <CardDescription>Create and manage your surveys with ease</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Survey Designer is a powerful tool that allows you to create custom surveys quickly and efficiently. 
            Whether you're conducting market research, gathering customer feedback, or running an academic study, 
            our platform provides all the features you need to design effective surveys.
          </p>
          <h2 className="text-xl font-semibold mt-4">Getting Started</h2>
          <ol className="list-decimal list-inside space-y-2">
            <li>Click on "Create Survey" in the sidebar to start a new survey.</li>
            <li>Add questions and choose from various input types for each question.</li>
            <li>Preview your survey to ensure it looks and functions as expected.</li>
            <li>Save your survey and find it later in the "My Surveys" section.</li>
          </ol>
          <div className="flex justify-center mt-6">
            <Button asChild>
              <NavLink to="/create">Create Your First Survey</NavLink>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;