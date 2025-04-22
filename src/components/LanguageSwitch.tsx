"use client";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/language";

export function LanguageSwitch() {
  const { language, setLanguage } = useLanguage();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setLanguage(language === "zh" ? "en" : "zh")}
      className="text-sm"
    >
      {language === "zh" ? "English" : "中文"}
    </Button>
  );
}
