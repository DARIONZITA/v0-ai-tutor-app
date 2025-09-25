"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
// Using native inputs to avoid dependency on missing UI input component
import { studentsApi } from "@/lib/api"
import { Trash, PlusCircle } from "lucide-react"

export function StudentManagement() {
  const [students, setStudents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [adding, setAdding] = useState(false)
  const [name, setName] = useState("")
  const [className, setClassName] = useState("")
  const [filter, setFilter] = useState("")
  const [message, setMessage] = useState<string | null>(null)

  const load = async (cls?: string) => {
    try {
      setLoading(true)
      const res = await studentsApi.getStudents(cls)
      setStudents(res.students || [])
    } catch (e) {
      console.error('Failed to load students', e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const onAdd = async () => {
    if (!name || !className) {
      setMessage('Please provide both name and class')
      return
    }

    // Client-side duplicate check by name+class
    const duplicate = students.find(s => s.name?.toLowerCase() === name.trim().toLowerCase() && s.class_name?.toLowerCase() === className.trim().toLowerCase())
    if (duplicate) {
      setMessage('Student with this name already exists in the selected class')
      return
    }

    try {
      setAdding(true)
      setMessage('Adding student...')
      await studentsApi.createStudent(name.trim(), className.trim())
      setName("")
      setClassName("")
      setMessage('Student added')
      await load(filter || undefined)
    } catch (e:any) {
      console.error(e)
      if (e?.response?.status === 409) {
        setMessage('Student already exists (server)')
      } else {
        setMessage('Failed to add student')
      }
    } finally {
      setAdding(false)
      setTimeout(()=>setMessage(null), 3000)
    }
  }

  const onDelete = async (id: string) => {
    if (!confirm('Remove student?')) return
    try {
      await studentsApi.deleteStudent(id)
      await load(filter || undefined)
    } catch (e) {
      console.error(e)
    }
  }

  const onFilter = async () => {
    await load(filter || undefined)
  }

  return (
    <div className="flex-1 px-4 lg:px-8 py-4 lg:py-8 overflow-y-auto">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="p-4 lg:p-6">
          <h3 className="text-lg font-semibold mb-4">Manage Students</h3>
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-3 mb-4">
            <input className="border p-2 rounded" placeholder="Student name" value={name} onChange={(e:any)=>setName(e.target.value)} />
            <input className="border p-2 rounded" placeholder="Class name (e.g. 5th A)" value={className} onChange={(e:any)=>setClassName(e.target.value)} />
            <Button onClick={onAdd} className="gap-2" disabled={adding || !name || !className}>
              {adding ? 'Adding...' : (<><PlusCircle className="w-4 h-4"/> Add</>)}
            </Button>
          </div>
          {message && <div className="text-sm text-gray-600 mb-2">{message}</div>}

          <div className="flex items-center gap-2 mb-4">
            <input className="border p-2 rounded" placeholder="Filter by class (e.g. 5th A)" value={filter} onChange={(e:any)=>setFilter(e.target.value)} />
            <Button onClick={onFilter}>Filter</Button>
            <Button onClick={()=>{ setFilter(''); load() }} variant="outline">Clear</Button>
          </div>

          {loading ? (
            <div>Loading...</div>
          ) : (
            <div className="max-h-80 overflow-y-auto space-y-2">
              {students.map(s => (
                <div key={s.id} className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 p-3 border rounded">
                  <div>
                    <div className="font-medium">{s.name}</div>
                    <div className="text-sm text-gray-500">{s.class_name}</div>
                  </div>
                  <div>
                    <Button variant="destructive" onClick={()=>onDelete(s.id)}><Trash className="w-4 h-4"/></Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
