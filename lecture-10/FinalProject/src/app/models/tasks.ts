export interface Task {
    _id?: string,
    title: String,
    description?: String,
    priority: String,
    dueDate?: Date,
    coverImage?: File,
    status: String,
    comments?: String
}