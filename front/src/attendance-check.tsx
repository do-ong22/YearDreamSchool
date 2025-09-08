"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "components/ui/card"
import { Button } from "components/ui/button"
import { Badge } from "components/ui/badge"
import { Input } from "components/ui/input"
import { Search, Save, RotateCcw, Filter, Download } from "lucide-react"

export default function AttendanceCheck() {
  const [searchTerm, setSearchTerm] = useState("")
  const [attendanceData, setAttendanceData] = useState([
    { seat: "A-01", name: "김민수", status: "present", time: "09:00" },
    { seat: "A-02", name: "이영희", status: "present", time: "09:05" },
    { seat: "A-03", name: "박철수", status: "absent", time: "-" },
    { seat: "A-04", name: "정수진", status: "present", time: "08:55" },
    { seat: "A-05", name: "최민호", status: "late", time: "09:15" },
    { seat: "B-01", name: "한지민", status: "present", time: "09:02" },
    { seat: "B-02", name: "송민규", status: "absent", time: "-" },
    { seat: "B-03", name: "윤서연", status: "present", time: "08:58" },
    { seat: "B-04", name: "장현우", status: "late", time: "09:20" },
    { seat: "B-05", name: "오수빈", status: "present", time: "09:01" },
  ])

  const toggleAttendance = (index: number) => {
    const newData = [...attendanceData]
    const currentStatus = newData[index].status

    if (currentStatus === "present") {
      newData[index].status = "absent"
      newData[index].time = "-"
    } else if (currentStatus === "absent") {
      newData[index].status = "late"
      newData[index].time = new Date().toLocaleTimeString("ko-KR", {
        hour: "2-digit",
        minute: "2-digit",
      })
    } else {
      newData[index].status = "present"
      newData[index].time = new Date().toLocaleTimeString("ko-KR", {
        hour: "2-digit",
        minute: "2-digit",
      })
    }

    setAttendanceData(newData)
  }

  const filteredData = attendanceData.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.seat.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const saveAttendance = () => {
    alert("Attendance saved successfully!")
  }

  const resetAttendance = () => {
    if (window.confirm("Reset all attendance data?")) {
      const resetData = attendanceData.map((student) => ({
        ...student,
        status: "absent",
        time: "-",
      }))
      setAttendanceData(resetData)
    }
  }

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "present":
        return "bg-system-green/10 text-system-green border-system-green/20 hover:bg-system-green/20"
      case "late":
        return "bg-system-orange/10 text-system-orange border-system-orange/20 hover:bg-system-orange/20"
      case "absent":
        return "bg-neutral-100 text-neutral-600 border-neutral-200 hover:bg-neutral-200"
      default:
        return "bg-neutral-100 text-neutral-600 border-neutral-200"
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
        <div>
          <h2 className="text-3xl font-bold text-neutral-900">Attendance Check</h2>
          <p className="text-neutral-500 mt-1">Manage student attendance by seat</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={resetAttendance} className="rounded-xl border-neutral-200 bg-transparent">
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
          <Button variant="outline" className="rounded-xl border-neutral-200 bg-transparent">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button onClick={saveAttendance} className="bg-system-blue hover:bg-system-blue/90 rounded-xl">
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      {/* Search and Filter */}
      <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
              <Input
                placeholder="Search by name or seat..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 bg-neutral-100/50 border-0 rounded-2xl h-12 font-medium"
              />
            </div>
            <Button variant="outline" className="rounded-xl border-neutral-200 h-12 px-6 bg-transparent">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Attendance Grid */}
      <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-neutral-900">Student Status</CardTitle>
          <CardDescription className="text-neutral-500">
            Click on any student card to cycle through: Present → Absent → Late → Present
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredData.map((student, index) => (
              <div
                key={student.seat}
                className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 hover:shadow-lg ${getStatusStyle(student.status)}`}
                onClick={() => toggleAttendance(attendanceData.indexOf(student))}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 bg-neutral-200 rounded-full flex items-center justify-center font-mono text-sm font-bold">
                    {student.seat}
                  </div>
                  <Badge
                    variant="outline"
                    className={`border-0 font-medium ${
                      student.status === "present"
                        ? "bg-system-green/20 text-system-green"
                        : student.status === "late"
                          ? "bg-system-orange/20 text-system-orange"
                          : "bg-neutral-200 text-neutral-600"
                    }`}
                  >
                    {student.status === "present" ? "Present" : student.status === "late" ? "Late" : "Absent"}
                  </Badge>
                </div>
                <h4 className="font-bold text-neutral-900 mb-2">{student.name}</h4>
                <p className="text-sm text-neutral-500">
                  {student.time !== "-" ? `Checked in: ${student.time}` : "Not checked in"}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Statistics Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-system-green/10 to-system-green/5 border border-system-green/20 rounded-2xl">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-system-green mb-2">
              {attendanceData.filter((s) => s.status === "present").length}
            </div>
            <p className="text-sm font-medium text-system-green">Present</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-system-orange/10 to-system-orange/5 border border-system-orange/20 rounded-2xl">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-system-orange mb-2">
              {attendanceData.filter((s) => s.status === "late").length}
            </div>
            <p className="text-sm font-medium text-system-orange">Late</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-neutral-100 to-neutral-50 border border-neutral-200 rounded-2xl">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-neutral-600 mb-2">
              {attendanceData.filter((s) => s.status === "absent").length}
            </div>
            <p className="text-sm font-medium text-neutral-600">Absent</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-system-blue/10 to-system-blue/5 border border-system-blue/20 rounded-2xl">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-system-blue mb-2">
              {Math.round((attendanceData.filter((s) => s.status === "present").length / attendanceData.length) * 100)}%
            </div>
            <p className="text-sm font-medium text-system-blue">Rate</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
