import express, { Request, Response } from 'express'
import cors from 'cors'
import {courses, students} from './database'

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

app.get('/', (req: Request, res: Response)=> {
    res.send("Hello World!")
})

app.get('/courses', (req: Request, res: Response)=> {
    res.status(200).send(courses)
})

app.get('/courses/search', (req: Request, res: Response)=> {
    const q = req.query.q as string
    
    const filteredCourses = courses.filter((course)=> {
        return course.name.toLowerCase().includes(q.toLowerCase())
    })
    res.status(200).send(filteredCourses)
})

app.post("/courses", (req : Request, res: Response)=> {
    const id = req.body.id
    const name = req.body.name
    const lessons = req.body.lessons
    const stack = req.body.stack

    const newCourse = {
        id, 
        name,
        lessons,
        stack
    }
    courses.push(newCourse)
    res.status(200).send("Course created sucesfully!")
})

app.get('/students', (req: Request, res: Response)=> {
    res.status(200).send(students)
})

app.get('/students/search', (req: Request, res: Response)=> {
    const q = req.query.q as string

    const filteredSearch = students.filter((student)=> {
        return student.name.toLowerCase().includes(q.toLowerCase())
    })
    res.status(200).send(filteredSearch)
})

app.post('/students', (req: Request, res: Response)=> {
    const id = req.body.id
    const name= req.body.name
    const age = req.body.age

    const newStudent = {
        id,
        name,
        age
    }
    students.push(newStudent)
    res.status(200).send("Student added sucesfully!")
})
