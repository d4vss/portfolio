"use client"

import * as React from "react"
import { LanguagesIcon } from "lucide-react"
import { useTranslation } from "react-i18next"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function LanguageSwitch() {
  const { t, i18n } = useTranslation()

  const [selectedLanguages, setSelectedLanguages] = React.useState<string[]>([i18n.language]);

  const toggleLanguage = (lng: string) => {
    setSelectedLanguages((prev) =>
      prev.includes(lng) ? prev.filter((language) => language !== lng) : [...prev, lng]
    )
    i18n.changeLanguage(lng)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <LanguagesIcon className="absolute h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Switch language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuCheckboxItem
          checked={selectedLanguages.includes("en")}
          onCheckedChange={() => toggleLanguage("en")}
        >
          {t("language.english")}
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={selectedLanguages.includes("pl")}
          onCheckedChange={() => toggleLanguage("pl")}
        >
          {t("language.polish")}
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={selectedLanguages.includes("de")}
          onCheckedChange={() => toggleLanguage("de")}
        >
          {t("language.german")}
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={selectedLanguages.includes("fr")}
          onCheckedChange={() => toggleLanguage("fr")}
        >
          {t("language.french")}
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={selectedLanguages.includes("es")}
          onCheckedChange={() => toggleLanguage("es")}
        >
          {t("language.spanish")}
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
