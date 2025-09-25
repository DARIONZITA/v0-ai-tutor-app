"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { classApi } from "@/lib/api"
import { FileText, Users, ChartBar, Clock, X } from "lucide-react"

export function ClassAnalysis() {
  const [groups, setGroups] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [detailLoading, setDetailLoading] = useState<string | null>(null)
  const [toast, setToast] = useState<string | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalLoading, setModalLoading] = useState(false)
  const [modalData, setModalData] = useState<any | null>(null)

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        const res = await classApi.getAnalysesByClass()
        setGroups(res.groups || [])
      } catch (e) {
        console.error('Failed to load class analyses', e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading class analyses...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 px-4 lg:px-8 py-4 lg:py-8 overflow-y-auto">
      <div className="max-w-6xl mx-auto space-y-6">
        {groups.length === 0 && (
          <Card className="p-4 lg:p-6 text-center">
            <FileText className="w-10 h-10 text-gray-400 mx-auto mb-2" />
            <div className="text-gray-600">No class analyses available</div>
          </Card>
        )}

        {groups.map((g) => (
          <Card key={g.class_name} className="p-4 lg:p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Class {g.class_name}</h3>
                <p className="text-sm text-gray-600">{g.count} analyses · Avg error: {g.average_error}%</p>
              </div>
              <div className="text-right">
                <Button variant="outline" className="gap-2" onClick={async ()=>{
                  try{
                    setDetailLoading(g.class_name)
                    setModalOpen(true)
                    setModalLoading(true)
                    setModalData(null)
                    setToast(null)
                    const res = await classApi.getClassInsights(g.class_name, true)
                    setModalData(res)
                    setToast('Class insights loaded')
                  }catch(e){
                    console.error('Failed to load class insights', e)
                    setToast('Failed to load class insights')
                    setModalData(null)
                  }finally{
                    setDetailLoading(null)
                    setModalLoading(false)
                    setTimeout(()=>setToast(null), 3000)
                  }
                }}>
                  <ChartBar className="w-4 h-4" />
                  {detailLoading === g.class_name ? 'Loading...' : 'View details'}
                </Button>
              </div>
            </div>

              <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-4 border border-gray-100">
                <h4 className="text-sm font-semibold text-gray-900 mb-2">Recent Analyses</h4>
                <ul className="space-y-2">
                  {g.analyses.slice(0,6).map((a:any) => (
                    <li key={a.id} className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div>
                        <div className="font-medium text-gray-900">{a.studentName}</div>
                        <div className="text-xs text-gray-500">{new Date(a.timestamp).toLocaleString()}</div>
                      </div>
                      <div className="text-sm text-gray-700">{a.data?.errorPercentage ?? a.data?.ai_analysis?.errorPercentage ?? '—'}%</div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-lg p-4 border border-gray-100">
                <h4 className="text-sm font-semibold text-gray-900 mb-2">Students</h4>
                <div className="text-sm text-gray-700">
                  {g.analyses && g.analyses.length > 0 ? (
                    <ul className="list-disc pl-5 text-sm">
                      {Array.from(new Set(g.analyses.map((a:any)=>a.studentName))).slice(0, 20).map((name:any)=> (
                        <li key={name}>{name}</li>
                      ))}
                    </ul>
                  ) : (
                    <div className="text-gray-500">No students found for this class</div>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
        {/* Modal */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/40" onClick={()=>{ setModalOpen(false); setModalData(null); }} />
            <div className="relative max-w-2xl w-full mx-4">
              <div className="bg-white rounded shadow-lg overflow-hidden">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 p-4 border-b">
                  <div className="font-semibold">Class details</div>
                  <button className="p-1 rounded hover:bg-gray-100" onClick={()=>{ setModalOpen(false); setModalData(null); }}><X className="w-4 h-4"/></button>
                </div>
                <div className="p-4 max-h-[60vh] overflow-y-auto">
                  {modalLoading ? (
                    <div className="text-center py-4 lg:py-8">
                      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mx-auto mb-4"></div>
                      <div>Processing class insights...</div>
                    </div>
                  ) : modalData ? (
                    <div className="space-y-3">
                      <div className="text-sm font-medium">{modalData.class_name} — {modalData.student_count} students</div>
                      <div className="text-sm text-gray-600">Average error: {modalData.average_error}%</div>
                      {modalData.commonErrors && modalData.commonErrors.length > 0 && (
                        <div>
                          <div className="font-semibold text-sm mt-2">Common Errors</div>
                          <ul className="list-disc pl-5 text-sm">{modalData.commonErrors.slice(0,8).map((e:any,i:number)=>(<li key={i}>{e}</li>))}</ul>
                        </div>
                      )}
                      {modalData.suggestions && modalData.suggestions.length > 0 && (
                        <div>
                          <div className="font-semibold text-sm mt-2">Suggestions</div>
                          <ul className="list-disc pl-5 text-sm">{modalData.suggestions.slice(0,8).map((s:any,i:number)=>(<li key={i}>{s}</li>))}</ul>
                        </div>
                      )}
                      <div>
                        <div className="font-semibold text-sm mt-2">Students (sample)</div>
                        <ul className="list-disc pl-5 text-sm">
                          {(modalData.detailed || []).slice(0,50).map((d:any)=>(
                            <li key={d.analysisId}>{d.studentName} — {d.errorPercentage ?? '—'}% — {d.shortRationale ?? ''}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-sm text-gray-600">No insights available</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
