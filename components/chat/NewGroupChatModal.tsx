import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useUserContext } from "../../context/User";
import { useState } from "react";
import SpinnerIcon from "../icons/Spinner";
import toast from "react-hot-toast";

const formSchema = z.object({
  groupName: z.string().min(2).max(50),
  groupDescription: z.string().min(50).max(5000),
  // groupImage: z.string().url(),
});

type Props = {};

const NewGroupChatModal = (props: Props) => {
  const [isGroupBeingCreated, setIsGroupBeingCreated] = useState(false);

  const { handleCreateGroupChat } = useUserContext();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      groupName: "",
      groupDescription: "",
      // groupImage: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    if (isGroupBeingCreated) return;

    setIsGroupBeingCreated(true);
    try {
      const group = await handleCreateGroupChat(values.groupName, {
        description: values.groupDescription,
        image:
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAvklEQVR4AcXBsW2FMBiF0Y8r3GQb6jeBxRauYRpo4yGQkMd4A7kg7Z/GUfSKe8703fKDkTATZsJsrr0RlZSJ9r4RLayMvLmJjnQS1d6IhJkwE2bT13U/DBzp5BN73xgRZsJMmM1HOolqb/yWiWpvjJSUiRZWopIykTATZsJs5g+1N6KSMiO1N/5DmAkzYTa9Lh6MhJkwE2ZzSZlo7xvRwson3txERzqJhJkwE2bT6+JhoKTMJ2pvjAgzYSbMfgDlXixqjH6gRgAAAABJRU5ErkJggg==",
        members: [],
        admins: [],
        private: true,
      });
      console.log(
        "🚀 ~ file: NewGroupChatModal.tsx:51 ~ handleSubmit ~ group:",
        group
      );
      toast.success(`Group ${group.chatId} created successfully`);
    } catch (error) {
      console.log(
        "🚀 ~ file: NewGroupChatModal.tsx:58 ~ handleSubmit ~ error:",
        error
      );
      toast.error((error as any).message);
    } finally {
      setIsGroupBeingCreated(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="groupName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Group Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={isGroupBeingCreated}
                    placeholder="Enter your group name here"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="groupDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Group Description</FormLabel>
                <FormControl>
                  <Input
                    disabled={isGroupBeingCreated}
                    placeholder="Enter your group description here"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <FormField
            control={form.control}
            name="groupImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Group Profile Picture</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your group profile picture here"
                    type="file"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
        </div>
        <Button type="submit" disabled={isGroupBeingCreated}>
          {isGroupBeingCreated && <SpinnerIcon className="mr-3" />}
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default NewGroupChatModal;
