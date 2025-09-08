"use client"

import { useState, useEffect } from "react"
import {
  Bell,
  Calendar,
  MessageCircle,
  Users,
  BookOpen,
  BarChart3,
  SettingsIcon,
  Menu,
  X,
  Search,
  LogOut,
} from "lucide-react"
import { Button } from "components/ui/button"
import { Badge } from "components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "components/ui/avatar"
import { Input } from "components/ui/input"
import AttendanceCheck from "attendance-check"
import Dashboard from "dashboard"
import Board from "board"
import Curriculum from "curriculum"
import CalendarView from "calendar"
import Chatbot from "chatbot"
import MainPage from "main"
import Settings from "settings"
import Notifications from "notifications"
import SearchModal from "search"
import Login from "login"

export default function YeardreamPlatform() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("dashboard")
  const [userRole, setUserRole] = useState("coach") // coach, admin, student
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  // 로그인 상태 확인 (localStorage에서)
  useEffect(() => {
    const savedUser = localStorage.getItem("yeardream_user")
    if (savedUser) {
      const userData = JSON.parse(savedUser)
      setCurrentUser(userData)
      setUserRole(userData.role)
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = (role: string, userData: any) => {
    setCurrentUser(userData)
    setUserRole(role)
    setIsAuthenticated(true)
    setActiveTab(role === "student" ? "main" : "dashboard")

    // 로그인 정보 저장
    localStorage.setItem("yeardream_user", JSON.stringify(userData))
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setCurrentUser(null)
    setUserRole("coach")
    setActiveTab("dashboard")

    // 로그인 정보 삭제
    localStorage.removeItem("yeardream_user")
  }

  // 로그인하지 않은 경우 로그인 페이지 표시
  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />
  }

  const menuItems = [
    { id: "main", label: "Home", icon: BarChart3, roles: ["coach", "admin", "student"] },
    { id: "dashboard", label: "Overview", icon: BarChart3, roles: ["coach", "admin"] },
    { id: "attendance", label: "Attendance", icon: Users, roles: ["coach"] },
    { id: "board", label: "Community", icon: MessageCircle, roles: ["coach", "admin", "student"] },
    { id: "curriculum", label: "Learning", icon: BookOpen, roles: ["coach", "admin", "student"] },
    { id: "calendar", label: "Schedule", icon: Calendar, roles: ["coach", "admin", "student"] },
  ]

  const filteredMenuItems = menuItems.filter((item) => item.roles.includes(userRole))

  const renderContent = () => {
    switch (activeTab) {
      case "main":
        return <MainPage userRole={userRole} currentUser={currentUser} onNavigate={setActiveTab} />
      case "dashboard":
        return <Dashboard userRole={userRole} />
      case "attendance":
        return <AttendanceCheck />
      case "board":
        return <Board userRole={userRole} />
      case "curriculum":
        return <Curriculum />
      case "calendar":
        return <CalendarView />
      default:
        return <Dashboard userRole={userRole} />
    }
  }

  return (
    <div className="flex h-screen bg-neutral-50">
      {/* Sidebar */}
      <div
        className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 left-0 z-50 w-72 bg-white/80 backdrop-blur-xl border-r border-neutral-200/50 shadow-2xl transform transition-all duration-500 ease-out lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex items-center justify-between h-20 px-8 border-b border-neutral-200/50">
          <div
            className="flex items-center space-x-3"
            onClick={() => setActiveTab("main")}
            style={{ cursor: "pointer" }}
          >
            <div className="w-10 h-10 bg-neutral-900 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">Y</span>
            </div>
            <div>
              <h1 className="text-xl font-semibold text-neutral-900">YearDreamSchool</h1>
              <p className="text-xs text-neutral-500 font-medium">Learning Platform</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-6">
          {/* Search */}
          <div className="relative mb-8">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
            <Input
              placeholder="Search..."
              className="pl-12 bg-neutral-100/50 border-0 rounded-2xl h-12 text-sm font-medium placeholder:text-neutral-400"
              onFocus={() => setShowSearch(true)}
            />
          </div>

          {/* User Profile */}
          <div className="flex items-center space-x-4 p-4 bg-neutral-100/50 rounded-3xl mb-8">
            <Avatar className="h-12 w-12 ring-2 ring-white shadow-lg">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback className="bg-system-blue text-white font-semibold">
                {currentUser?.name?.[0] || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="font-semibold text-neutral-900">{currentUser?.name || "사용자"}</p>
              <div className="flex items-center space-x-2 mt-1">
                <Badge
                  variant="outline"
                  className={`text-xs font-medium border-0 ${
                    userRole === "admin"
                      ? "bg-system-purple/10 text-system-purple"
                      : userRole === "coach"
                        ? "bg-system-blue/10 text-system-blue"
                        : "bg-system-green/10 text-system-green"
                  }`}
                >
                  {userRole === "admin" ? "Admin" : userRole === "coach" ? "Coach" : "Student"}
                </Badge>
                <p className="text-xs text-neutral-500">{currentUser?.department || currentUser?.seat || ""}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            {filteredMenuItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id)
                    setSidebarOpen(false)
                  }}
                  className={`w-full flex items-center space-x-4 px-4 py-4 rounded-2xl text-left transition-all duration-300 group ${
                    activeTab === item.id
                      ? "bg-neutral-900 text-white shadow-lg"
                      : "text-neutral-600 hover:bg-neutral-100/70 hover:text-neutral-900"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              )
            })}
          </nav>

          {/* Logout Button */}
          <div className="mt-8 pt-6 border-t border-neutral-200/50">
            <Button
              onClick={handleLogout}
              variant="outline"
              className="w-full justify-start text-neutral-600 hover:text-system-red hover:border-system-red/20 hover:bg-system-red/5 rounded-2xl h-12 bg-transparent"
            >
              <LogOut className="h-5 w-5 mr-4" />
              <span className="font-medium">로그아웃</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-xl border-b border-neutral-200/50 h-20 flex items-center justify-between px-8">
          <div className="flex items-center space-x-6">
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-neutral-900">
                {filteredMenuItems.find((item) => item.id === activeTab)?.label || "Overview"}
              </h1>
              <p className="text-sm text-neutral-500 font-medium">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="relative rounded-full"
              onClick={() => setShowNotifications(true)}
            >
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-system-red rounded-full"></span>
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setShowSettings(true)}>
              <SettingsIcon className="h-5 w-5" />
            </Button>
            <Avatar className="h-10 w-10 ring-2 ring-neutral-200">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback className="bg-system-blue text-white">{currentUser?.name?.[0] || "U"}</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-8 animate-fade-in">{renderContent()}</main>
      </div>

      {/* Chatbot */}
      <Chatbot />

      {/* Modals */}
      {showNotifications && <Notifications onClose={() => setShowNotifications(false)} />}
      {showSearch && <SearchModal onClose={() => setShowSearch(false)} onNavigate={setActiveTab} />}
      {showSettings && <Settings userRole={userRole} onClose={() => setShowSettings(false)} />}

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}
