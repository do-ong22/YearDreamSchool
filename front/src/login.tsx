"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "components/ui/card"
import { Button } from "components/ui/button"
import { Input } from "components/ui/input"
import { Label } from "components/ui/label"
import { Checkbox } from "components/ui/checkbox"
import { Eye, EyeOff, Mail, Lock, User, Shield, BookOpen, ArrowRight } from "lucide-react"

interface LoginProps {
  onLogin: (userRole: string, userData: any) => void
}

export default function Login({ onLogin }: LoginProps) {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
    rememberMe: false,
  })

  // 데모용 계정들
  const demoAccounts = [
    {
      email: "admin@eardream.com",
      password: "admin123",
      role: "admin",
      name: "박관리자",
      department: "운영팀",
    },
    {
      email: "coach@eardream.com",
      password: "coach123",
      role: "coach",
      name: "김코치",
      department: "프론트엔드팀",
    },
    {
      email: "student@eardream.com",
      password: "student123",
      role: "student",
      name: "이수강생",
      seat: "A-01",
    },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // 로그인 시뮬레이션
    setTimeout(() => {
      if (isLogin) {
        // 로그인 처리
        const account = demoAccounts.find((acc) => acc.email === formData.email && acc.password === formData.password)

        if (account) {
          onLogin(account.role, account)
        } else {
          alert("이메일 또는 비밀번호가 올바르지 않습니다.")
        }
      } else {
        // 회원가입 처리
        if (formData.password !== formData.confirmPassword) {
          alert("비밀번호가 일치하지 않습니다.")
          setLoading(false)
          return
        }

        // 새 계정 생성 (데모)
        const newUser = {
          email: formData.email,
          name: formData.name,
          role: "student", // 기본값
          department: "신규 수강생",
        }

        alert("회원가입이 완료되었습니다! 로그인해주세요.")
        setIsLogin(true)
        setFormData({ ...formData, password: "", confirmPassword: "" })
      }
      setLoading(false)
    }, 1500)
  }

  const handleDemoLogin = (account: any) => {
    setFormData({
      ...formData,
      email: account.email,
      password: account.password,
    })
    setTimeout(() => {
      onLogin(account.role, account)
    }, 500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* 왼쪽: 브랜딩 섹션 */}
        <div className="hidden lg:block space-y-8">
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-neutral-900 rounded-3xl flex items-center justify-center shadow-2xl">
                <span className="text-white font-bold text-2xl">Y</span>
              </div>
              <div>
                <h1 className="text-4xl font-bold text-neutral-900">YearDreamSchool</h1>
                <p className="text-xl text-neutral-600">Learning Platform</p>
              </div>
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-neutral-900">함께 성장하는 개발자 교육 플랫폼</h2>
              <p className="text-lg text-neutral-600 leading-relaxed">
                체계적인 커리큘럼과 실무 중심 교육으로 여러분의 개발자 꿈을 현실로 만들어보세요.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center space-x-4 p-4 bg-white/50 backdrop-blur-sm rounded-2xl border border-neutral-200/50">
              <div className="w-12 h-12 bg-system-blue/10 rounded-2xl flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-system-blue" />
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900">체계적인 커리큘럼</h3>
                <p className="text-sm text-neutral-600">기초부터 실무까지 단계별 학습</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-4 bg-white/50 backdrop-blur-sm rounded-2xl border border-neutral-200/50">
              <div className="w-12 h-12 bg-system-green/10 rounded-2xl flex items-center justify-center">
                <User className="h-6 w-6 text-system-green" />
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900">1:1 멘토링</h3>
                <p className="text-sm text-neutral-600">개인별 맞춤 지도와 피드백</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-4 bg-white/50 backdrop-blur-sm rounded-2xl border border-neutral-200/50">
              <div className="w-12 h-12 bg-system-purple/10 rounded-2xl flex items-center justify-center">
                <Shield className="h-6 w-6 text-system-purple" />
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900">취업 지원</h3>
                <p className="text-sm text-neutral-600">포트폴리오부터 면접까지 완벽 지원</p>
              </div>
            </div>
          </div>
        </div>

        {/* 오른쪽: 로그인/회원가입 폼 */}
        <div className="w-full max-w-md mx-auto">
          <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-2xl rounded-3xl overflow-hidden">
            <CardHeader className="text-center pb-8">
              <div className="w-16 h-16 bg-neutral-900 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg lg:hidden">
                <span className="text-white font-bold text-xl">E</span>
              </div>
              <CardTitle className="text-2xl font-bold text-neutral-900">{isLogin ? "로그인" : "회원가입"}</CardTitle>
              <CardDescription className="text-neutral-600">
                {isLogin ? "계정에 로그인하여 학습을 시작하세요" : "새 계정을 만들어 학습을 시작하세요"}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* 데모 계정 버튼들 */}
              {isLogin && (
                <div className="space-y-3">
                  <p className="text-sm font-medium text-neutral-700 text-center">빠른 데모 로그인</p>
                  <div className="grid grid-cols-1 gap-2">
                    {demoAccounts.map((account, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        onClick={() => handleDemoLogin(account)}
                        className="justify-between h-12 rounded-xl bg-transparent hover:bg-neutral-50"
                      >
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              account.role === "admin"
                                ? "bg-system-purple/10 text-system-purple"
                                : account.role === "coach"
                                  ? "bg-system-blue/10 text-system-blue"
                                  : "bg-system-green/10 text-system-green"
                            }`}
                          >
                            {account.role === "admin" ? (
                              <Shield className="h-4 w-4" />
                            ) : account.role === "coach" ? (
                              <User className="h-4 w-4" />
                            ) : (
                              <BookOpen className="h-4 w-4" />
                            )}
                          </div>
                          <div className="text-left">
                            <p className="font-medium text-sm">{account.name}</p>
                            <p className="text-xs text-neutral-500">
                              {account.role === "admin" ? "관리자" : account.role === "coach" ? "코치" : "수강생"}
                            </p>
                          </div>
                        </div>
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    ))}
                  </div>
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-neutral-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-white text-neutral-500">또는</span>
                    </div>
                  </div>
                </div>
              )}

              {/* 로그인/회원가입 폼 */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="name">이름</Label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
                      <Input
                        id="name"
                        type="text"
                        placeholder="이름을 입력하세요"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="pl-12 rounded-xl h-12"
                        required
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">이메일</Label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="이메일을 입력하세요"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="pl-12 rounded-xl h-12"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">비밀번호</Label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="비밀번호를 입력하세요"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="pl-12 pr-12 rounded-xl h-12"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">비밀번호 확인</Label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
                      <Input
                        id="confirmPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="비밀번호를 다시 입력하세요"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        className="pl-12 rounded-xl h-12"
                        required
                      />
                    </div>
                  </div>
                )}

                {isLogin && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="remember"
                        checked={formData.rememberMe}
                        onCheckedChange={(checked) => setFormData({ ...formData, rememberMe: checked as boolean })}
                      />
                      <Label htmlFor="remember" className="text-sm text-neutral-600">
                        로그인 상태 유지
                      </Label>
                    </div>
                    <Button variant="link" className="text-sm text-system-blue p-0 h-auto">
                      비밀번호 찾기
                    </Button>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl h-12 font-semibold"
                  disabled={loading}
                >
                  {loading ? "처리 중..." : isLogin ? "로그인" : "회원가입"}
                </Button>
              </form>

              <div className="text-center">
                <p className="text-sm text-neutral-600">
                  {isLogin ? "계정이 없으신가요?" : "이미 계정이 있으신가요?"}
                  <Button
                    variant="link"
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-system-blue p-0 ml-1 h-auto font-semibold"
                  >
                    {isLogin ? "회원가입" : "로그인"}
                  </Button>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 데모 계정 정보 */}
          {isLogin && (
            <Card className="mt-6 bg-neutral-50/50 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
              <CardContent className="p-4">
                <h3 className="font-semibold text-sm text-neutral-700 mb-3">데모 계정 정보</h3>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-neutral-600">관리자:</span>
                    <span className="font-mono">admin@eardream.com / admin123</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">코치:</span>
                    <span className="font-mono">coach@eardream.com / coach123</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">수강생:</span>
                    <span className="font-mono">student@eardream.com / student123</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
