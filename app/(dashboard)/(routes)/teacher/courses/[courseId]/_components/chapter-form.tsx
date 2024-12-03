"use client";

import * as z from 'zod';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form";
import { Button } from '@/components/ui/button';
import { Pencil, PlusCircle } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { Chapter, Course } from '@prisma/client';
import { Input } from '@/components/ui/input';

interface ChapterFormProps  {
  initialData: Course & { chapters: Chapter[]};
  courseId: string;
};

const formSchema = z.object({
  title: z.string().min(1)
})

export const ChapterForm = ({ initialData, courseId } : ChapterFormProps) => {

  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);
  const toggleCreating = () => setIsCreating((current) => !current);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { title: "" }
  });

  const { isSubmitted, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/courses/${courseId}/chapters`, values);
      toast.success("Chapter created!!");
      toggleCreating();
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong")
    }
  }

  return(
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course Chapters
        <Button onClick={toggleCreating} variant="ghost">
          {isCreating ? (
            <>Cancel</>
          ) : (
            <>
            <PlusCircle className='h-4  w-4 mr-2'/>
              Add a chapter
            </>
            )}
        </Button>
      </div>
      {isCreating && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 mt-43'>
            <FormField control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input disabled={isSubmitted} placeholder="e.g 'Introduction to the course'" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem> 
            )} />
              <Button disabled={!isValid || isSubmitted} type="submit">Created</Button>
            </form>
          </Form>
        )}
        {!isCreating && (
          <div className={cn(
            "text-sm mt-2",
            !initialData.chapters.length && "text-slate-500 italic"
          )}>
            {!initialData.chapters.length && "No Chapters"}
            {/**TODO: Add a List of chapters */}
          </div>
        )}
         {isCreating && (
              <p className="text-xs text-muted-foreground mt-4">
                Drag and drop to reoder the chapters
              </p>
            )
          }
        </div>
  )
};