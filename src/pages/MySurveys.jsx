import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Edit, Trash2 } from 'lucide-react';

const MySurveys = () => {
  const [surveys, setSurveys] = useState([]);

  useEffect(() => {
    // In a real app, you would fetch surveys from an API or database
    // For now, we'll use mock data stored in localStorage
    const storedSurveys = JSON.parse(localStorage.getItem('surveys') || '[]');
    setSurveys(storedSurveys);
  }, []);

  const handleDelete = (id) => {
    const updatedSurveys = surveys.filter(survey => survey.id !== id);
    setSurveys(updatedSurveys);
    localStorage.setItem('surveys', JSON.stringify(updatedSurveys));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Surveys</h1>
      {surveys.length === 0 ? (
        <p>You haven't created any surveys yet.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {surveys.map((survey) => (
            <Card key={survey.id}>
              <CardHeader>
                <CardTitle>{survey.title}</CardTitle>
                <CardDescription>{survey.questions.length} questions</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">
                  Created on: {new Date(survey.createdAt).toLocaleDateString()}
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="icon">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="destructive" size="icon" onClick={() => handleDelete(survey.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MySurveys;