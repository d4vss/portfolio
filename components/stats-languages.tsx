"use client"

import * as React from "react"
import { Label, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Repository } from "./github-data"

export default function StatsLanguages({ repos }: { repos: Repository[] }) {
  // Process the repos to group by language
  const chartData = React.useMemo(() => {
    const languageCounts: Record<string, number> = {}

    // Count the repositories for each language
    repos.forEach((repo) => {
      const { language } = repo
      if (language) {
        if (!languageCounts[language]) {
          languageCounts[language] = 0
        }
        languageCounts[language]++
      }
    })

    // Convert the languageCounts object into an array and sort by repository count
    const sortedLanguages = Object.entries(languageCounts)
      .sort(([, countA], [, countB]) => countB - countA)

    // Get the top 4 languages
    const topLanguages = sortedLanguages.slice(0, 4)

    // Group the rest into "Other"
    const otherCount = sortedLanguages
      .slice(4)
      .reduce((acc, [, count]) => acc + count, 0)

    // Build the final chart data
    const data = topLanguages.map(([language, count]) => ({
      language,
      repositories: count,
      fill: `var(--color-${language.toLowerCase()})`, // Assumes you have colors defined for each language
    }))

    // Add "Other" if there are remaining languages
    if (otherCount > 0) {
      data.push({
        language: "Other",
        repositories: otherCount,
        fill: "var(--color-other)",
      })
    }

    return data
  }, [repos])

  const totalRepositories = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.repositories, 0)
  }, [chartData])

  const chartConfig = {
    repositories: {
      label: "Repositories",
    },
    ...chartData.reduce((acc: Record<string, { label: string; color: string }>, { language }, index: number) => {
      acc[language.toLowerCase()] = {
        label: language,
        color: `hsl(var(--chart-${index + 1}))`, // Assuming you have some color mapping based on index
      }
      return acc
    }, {}),
  } satisfies ChartConfig  

  return (
    <Card className="flex flex-col border-none p-0">
      <CardHeader className="items-center pb-0">
        <CardTitle className="capitalize text-center">Use of Programming Languages</CardTitle>
        <CardDescription>Based on public GitHub repositories</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="repositories"
              nameKey="language"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalRepositories.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Repositories
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
