import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";

const AnswerSurvey = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [survey, setSurvey] = useState(null);
  const [responses, setResponses] = useState({});

  useEffect(() => {
    const surveys = JSON.parse(localStorage.getItem('surveys') || '[]');
    const foundSurvey = surveys.find(s => s.id === id);
    if (foundSurvey) {
      setSurvey(foundSurvey);
      // Initialize responses
      const initialResponses = {};
      foundSurvey.questions.forEach(q => {
        initialResponses[q.text] = q.type === 'slider' ? 50 : '';
      });
      setResponses(initialResponses);
    } else {
      toast.error("Survey not found");
      navigate('/');
    }
  }, [id, navigate]);

  const handleInputChange = (questionText, value) => {
    setResponses(prev => ({ ...prev, [questionText]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const surveyResponses = JSON.parse(localStorage.getItem('surveyResponses') || '[]');
    surveyResponses.push({
      surveyId: id,
      responses: responses,
      submittedAt: new Date().toISOString()
    });
    localStorage.setItem('surveyResponses', JSON.stringify(surveyResponses));
    toast.success("Survey submitted successfully!");
    navigate('/');
  };

  if (!survey) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>{survey.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {survey.questions.map((question, index) => (
              <div key={index} className="space-y-2">
                <Label htmlFor={`question-${index}`}>{question.text}</Label>
                {question.type === 'text' && (
                  <Input
                    id={`question-${index}`}
                    value={responses[question.text] || ''}
                    onChange={(e) => handleInputChange(question.text, e.target.value)}
                    required
                  />
                )}
                {question.type === 'number' && (
                  <Input
                    id={`question-${index}`}
                    type="number"
                    value={responses[question.text] || ''}
                    onChange={(e) => handleInputChange(question.text, e.target.value)}
                    required
                  />
                )}
                {question.type === 'dropdown' && (
                  <Select
                    value={responses[question.text] || ''}
                    onValueChange={(value) => handleInputChange(question.text, value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="option1">Option 1</SelectItem>
                      <SelectItem value="option2">Option 2</SelectItem>
                      <SelectItem value="option3">Option 3</SelectItem>
                    </SelectContent>
                  </Select>
                )}
                {question.type === 'slider' && (
                  <Slider
                    id={`question-${index}`}
                    min={0}
                    max={100}
                    step={1}
                    value={[responses[question.text] || 50]}
                    onValueChange={(value) => handleInputChange(question.text, value[0])}
                  />
                )}
              </div>
            ))}
            <Button type="submit">Submit Survey</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnswerSurvey;