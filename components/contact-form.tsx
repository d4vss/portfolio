"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AtSignIcon } from "@/components/icons/at-sign-icon";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Turnstile, TurnstileInstance } from "@marsidev/react-turnstile";
import { useRef, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema } from "@/lib/zod";
import { submitContactForm } from "@/app/actions";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SendIcon } from "lucide-react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

export default function ContactForm() {
  const { t } = useTranslation();
  const turnstile = useRef<TurnstileInstance | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<
    string | null | undefined
  >(null);
  const [turnstileDone, setTurnstileDone] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      email: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof contactFormSchema>) {
    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("message", values.message);
    formData.append("cf-turnstile-response", turnstileToken as string);

    if (!turnstileDone) return toast.error(t("contact.turnstileerror"));

    try {
      const response = await submitContactForm(null, formData);
      if (response == 200) {
        form.reset();
        setIsModalOpen(false);
        toast.success(t("contact.success"));
      } else {
        toast.error(t("contact.error"));
      }
    } catch (error) {
      console.error(error);
      toast.error(t("contact.error"));
    }
    turnstile.current?.reset();
  }

  return (
    <div>
      <TooltipProvider delayDuration={290}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button size="icon" onClick={() => setIsModalOpen(true)}>
              <AtSignIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">{t("contact.tooltip")}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
  
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("contact.title")}</DialogTitle>
            <DialogDescription>{t("contact.subtitle")}</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              noValidate
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("contact.emailLabel")}</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder={t("contact.emailPlaceholder")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between pb-1">
                      <FormLabel>{t("contact.messageLabel")}</FormLabel>
                      <FormLabel
                        className={
                          form.getValues().message.length > 1000
                            ? "text-red-500"
                            : ""
                        }
                      >
                        {form.getValues().message.length}/1000
                      </FormLabel>
                    </div>
                    <FormControl>
                      <Textarea
                        placeholder={t("contact.messagePlaceholder")}
                        maxLength={1000}
                        rows={6}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Turnstile
                ref={turnstile}
                className="w-full"
                options={{
                  theme: "auto",
                  size: "flexible",
                }}
                siteKey={
                  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY as string
                }
                onError={() => setTurnstileDone(false)}
                onExpire={() => setTurnstileDone(false)}
                onSuccess={(token: string) => {
                  setTurnstileToken(token);
                  setTurnstileDone(true);
                }}
              />
              <Button
                className="w-full"
                disabled={form.formState.isSubmitting}
                type="submit"
                variant="default"
              >
                <SendIcon className="w-4 h-4" />
                {t("contact.submit")}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
