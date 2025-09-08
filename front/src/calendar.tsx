"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "components/ui/card"
import { Button } from "components/ui/button"
import { Badge } from "components/ui/badge"
import { CalendarIcon, ChevronLeft, ChevronRight, Plus } from "lucide-react"

export default function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())

  const events = [
    {
      id: 1,
      title: "웹 개발 기초 수업",
      date: "2024-01-15",
      time: "09:00-12:00",
      type: "수업",
      description: "HTML/CSS 기초 학습",
    },
    {
      id: 2,
      title: "프로젝트 발표",
      date: "2024-01-18",
      time: "14:00-17:00",
      type: "발표",
      description: "1차 프로젝트 발표 및 피드백",
    },
    {
      id: 3,
      title: "취업 특강",
      date: "2024-01-22",
      time: "13:00-15:00",
      type: "특강",
      description: "이력서 작성법 및 면접 준비",
    },
    {
      id: 4,
      title: "멘토링 세션",
      date: "2024-01-25",
      time: "16:00-18:00",
      type: "멘토링",
      description: "개별 진로 상담",
    },
  ]

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const navigateMonth = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate)
    if (direction === "prev") {
      newDate.setMonth(newDate.getMonth() - 1)
    } else {
      newDate.setMonth(newDate.getMonth() + 1)
    }
    setCurrentDate(newDate)
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
    })
  }

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "수업":
        return "default"
      case "발표":
        return "destructive"
      case "특강":
        return "secondary"
      case "멘토링":
        return "outline"
      default:
        return "outline"
    }
  }

  // const hasEvent = (day: number) => {
  //   const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
  //   return events.some((event) => event.date === dateStr)
  // }

  const getEventsForDate = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
    return events.filter((event) => event.date === dateStr)
  }

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate)
    const firstDay = getFirstDayOfMonth(currentDate)
    const days = []

    // 빈 칸 추가 (월의 첫 날이 일요일이 아닌 경우)
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 border border-gray-100"></div>)
    }

    // 날짜 추가
    for (let day = 1; day <= daysInMonth; day++) {
      const dayEvents = getEventsForDate(day)
      const isToday =
        new Date().getDate() === day &&
        new Date().getMonth() === currentDate.getMonth() &&
        new Date().getFullYear() === currentDate.getFullYear()

      days.push(
        <div
          key={day}
          className={`h-24 border border-gray-100 p-1 cursor-pointer hover:bg-gray-50 ${
            isToday ? "bg-blue-50 border-blue-200" : ""
          }`}
          onClick={() => setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))}
        >
          <div className={`text-sm font-medium mb-1 ${isToday ? "text-blue-600" : ""}`}>{day}</div>
          <div className="space-y-1">
            {dayEvents.slice(0, 2).map((event, index) => (
              <div key={index} className="text-xs p-1 bg-blue-100 text-blue-800 rounded truncate">
                {event.title}
              </div>
            ))}
            {dayEvents.length > 2 && <div className="text-xs text-gray-500">+{dayEvents.length - 2}개 더</div>}
          </div>
        </div>,
      )
    }

    return days
  }

  const todayEvents = events.filter((event) => {
    const today = new Date().toISOString().split("T")[0]
    return event.date === today
  })

  const upcomingEvents = events.filter((event) => {
    const eventDate = new Date(event.date)
    const today = new Date()
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
    return eventDate > today && eventDate <= nextWeek
  })

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold">캘린더</h2>
          <p className="text-muted-foreground">교육 일정과 주요 행사를 확인하세요</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          일정 추가
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 캘린더 */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <CalendarIcon className="h-5 w-5" />
                  <span>{formatDate(currentDate)}</span>
                </CardTitle>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => navigateMonth("prev")}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => navigateMonth("next")}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-0 mb-4">
                {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
                  <div
                    key={day}
                    className="h-8 flex items-center justify-center font-medium text-sm text-gray-600 border-b"
                  >
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-0">{renderCalendarDays()}</div>
            </CardContent>
          </Card>
        </div>

        {/* 사이드바 */}
        <div className="space-y-6">
          {/* 오늘의 일정 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">오늘의 일정</CardTitle>
              <CardDescription>
                {new Date().toLocaleDateString("ko-KR", {
                  month: "long",
                  day: "numeric",
                  weekday: "long",
                })}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {todayEvents.length > 0 ? (
                <div className="space-y-3">
                  {todayEvents.map((event) => (
                    <div key={event.id} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-sm">{event.title}</h4>
                        <Badge variant={getEventTypeColor(event.type)}>{event.type}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">{event.time}</p>
                      <p className="text-xs text-muted-foreground">{event.description}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">오늘 예정된 일정이 없습니다.</p>
              )}
            </CardContent>
          </Card>

          {/* 다가오는 일정 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">다가오는 일정</CardTitle>
              <CardDescription>이번 주 예정된 일정들</CardDescription>
            </CardHeader>
            <CardContent>
              {upcomingEvents.length > 0 ? (
                <div className="space-y-3">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-sm">{event.title}</h4>
                        <Badge variant={getEventTypeColor(event.type)}>{event.type}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">
                        {new Date(event.date).toLocaleDateString("ko-KR")} {event.time}
                      </p>
                      <p className="text-xs text-muted-foreground">{event.description}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">이번 주 예정된 일정이 없습니다.</p>
              )}
            </CardContent>
          </Card>

          {/* 일정 유형 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">일정 유형</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Badge variant="default">수업</Badge>
                  <span className="text-sm text-muted-foreground">정규 수업</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="destructive">발표</Badge>
                  <span className="text-sm text-muted-foreground">프로젝트 발표</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">특강</Badge>
                  <span className="text-sm text-muted-foreground">특별 강의</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">멘토링</Badge>
                  <span className="text-sm text-muted-foreground">개별 상담</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
