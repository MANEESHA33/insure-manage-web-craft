
import React from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HelpCircle, Phone, Mail, MessageSquare } from "lucide-react";

const Help = () => {
  const handleSubmitQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the question to backend
    alert("Your question has been submitted. We'll get back to you soon!");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Help & Support</h1>
        <p className="text-muted-foreground">
          Find answers to common questions or contact our support team
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="text-center">
            <Phone className="h-10 w-10 mx-auto text-insurance-primary" />
            <CardTitle>Call Us</CardTitle>
            <CardDescription>
              Speak directly with our support team
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="font-medium">1-800-INSURE-ME</p>
            <p className="text-sm text-muted-foreground">Mon-Fri, 9am-5pm</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="text-center">
            <Mail className="h-10 w-10 mx-auto text-insurance-primary" />
            <CardTitle>Email Support</CardTitle>
            <CardDescription>
              Send us an email anytime
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="font-medium">support@insuremanage.com</p>
            <p className="text-sm text-muted-foreground">We respond within 24 hours</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="text-center">
            <MessageSquare className="h-10 w-10 mx-auto text-insurance-primary" />
            <CardTitle>Live Chat</CardTitle>
            <CardDescription>
              Chat with a support agent
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button className="w-full">Start Chat</Button>
            <p className="text-sm text-muted-foreground mt-2">Available 24/7</p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
          <CardDescription>
            Find quick answers to common questions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How do I file a new claim?</AccordionTrigger>
              <AccordionContent>
                To file a new claim, navigate to the Claims section in your dashboard and click on 
                "Submit New Claim". Fill out the required information about the incident, upload 
                any supporting documentation, and submit the form. Our claims team will review your 
                submission and follow up within 1-2 business days.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>How do I make a payment?</AccordionTrigger>
              <AccordionContent>
                Payments can be made through the Payments section of your account. We accept major 
                credit cards, bank transfers, and checks. You can set up automatic payments for 
                your convenience. All payments are processed securely and you'll receive a receipt 
                via email.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>How can I update my policy information?</AccordionTrigger>
              <AccordionContent>
                To update your policy details, navigate to the Policies section and select the policy 
                you wish to modify. Click on the "Edit" button to make changes to your coverage, 
                beneficiaries, or other details. Some changes may affect your premium and might require 
                approval from an agent.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>What documents do I need to upload for a claim?</AccordionTrigger>
              <AccordionContent>
                For most claims, you'll need to provide proof of the incident (such as photos, police 
                reports, or medical reports), identification documents, and a completed claim form. 
                The specific requirements vary by the type of claim and policy. Our system will guide 
                you through the necessary documentation during the claim submission process.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>How long does it take to process a claim?</AccordionTrigger>
              <AccordionContent>
                Most standard claims are processed within 3-5 business days once all required documentation 
                has been received. Complex claims may take longer. You can check the status of your claim 
                at any time through the Claims section of your account. We'll also send you email updates 
                as your claim progresses.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Ask a Question</CardTitle>
          <CardDescription>
            Didn't find what you're looking for? Submit your question
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmitQuestion} className="space-y-4">
            <div className="space-y-2">
              <Input placeholder="Enter your question here..." />
            </div>
            <Button type="submit">Submit Question</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Help;
