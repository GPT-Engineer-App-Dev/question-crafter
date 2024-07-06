import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2 } from 'lucide-react';
import { toast } from "sonner";

const CreateSurvey = () => {
  const [surveyTitle, setSurveyTitle] = useState('');
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();

  const addQuestion = () => {
    setQuestions([...questions, { text: '', type: 'text' }]);
  };

  const removeQuestion = (index) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
  };

  const updateQuestion = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newSurvey = {
      id: Date.now().toString(),
      title: surveyTitle,
      questions: questions,
      createdAt: new Date().toISOString()
    };

    // Get existing surveys from localStorage
    const existingSurveys = JSON.parse(localStorage.getItem('surveys') || '[]');
    
    // Add new survey to the array
    const updatedSurveys = [...existingSurveys, newSurvey];
    
    // Save updated surveys array back to localStorage
    localStorage.setItem('surveys', JSON.stringify(updatedSurveys));

    // Show success notification
    toast.success("Survey saved successfully!");

    // Navigate to My Surveys page
    navigate('/my-surveys');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Create New Survey</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="survey-title">Survey Title</Label>
              <Input
                id="survey-title"
                value={surveyTitle}
                onChange={(e) => setSurveyTitle(e.target.value)}
                placeholder="Enter survey title"
                required
              />
            </div>

            {questions.map((question, index) => (
              <Card key={index} className="p-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor={`question-${index}`}>Question {index + 1}</Label>
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      onClick={() => removeQuestion(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <Input
                    id={`question-${index}`}
                    value={question.text}
                    onChange={(e) => updateQuestion(index, 'text', e.target.value)}
                    placeholder="Enter question text"
                    required
                  />
                  <Select
                    value={question.type}
                    onValueChange={(value) => updateQuestion(index, 'type', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select input type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="text">Text</SelectItem>
                      <SelectItem value="number">Number</SelectItem>
                      <SelectItem value="dropdown">Dropdown</SelectItem>
                      <SelectItem value="slider">Slider</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </Card>
            ))}

            <Button type="button" onClick={addQuestion}>Add Question</Button>
            <Button type="submit">Save Survey</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateSurvey;