import express from "express"
import { PrismaClient, TaskStatus } from "@prisma/client"

const router = express.Router();

const prisma = new PrismaClient();

const getTasksForUser = async (userID: string) => {
    return await prisma.task.findMany({
        where: {
            userId: userID
        }
    });
};

const getTasksForAdmin = async (familyID: string) => {
    return await prisma.task.findMany({
        where: {
            user: {
                family: { id: familyID }
            }
        }
    });
};

router.get('/get-all-tasks', async (req, res) => {
  const { userID } = req.query as { userID: string }

    if (!userID) return res.status(400).json({ message: 'No userID provided' });
  
  try{
    const user = await prisma.user.findUnique({ where: { id: userID } });
    if (!user) return res.status(400).json({ message: 'No user found' });
     let tasks 
     if(user.role === "USER"){
        tasks = await getTasksForUser(userID);
     }
     else if(user.role === "ADMIN"){
        const familyID =  user.familyID;
        tasks = await getTasksForAdmin(familyID);
     }
      res.status(200).json({ tasks });

  }catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})


router.post('/edit-task', async (req, res) => {
    
    const {name, description, amount, userId,start_date,end_date, isActive, status, id } = req.body
    if(!userId) return res.status(400).json({ message: 'User id is required' });
    
    //change status to false when task approved
    let activeTask = isActive
    if(status === TaskStatus.APPROVED){
      activeTask = false
    }

    console.log('status',status, isActive)
    if(id){
        await prisma.task.update({
            where: {
              id: id,
            },
            data: {
              name: name,
              description: description,
              userId: userId,
              amount: amount,
              start_date: start_date,
              end_date: end_date,
              isActive: activeTask,
              status: status,
            },
          });
          return res.status(200).json({ message: 'Task updated successfully' });
    }
    else{
        await prisma.task.create({
        data: {
          name: name,
          description: description,
          userId: userId,
          amount: amount,
          start_date: start_date,
          end_date: end_date,
          isActive: activeTask,
          status: status,
        }
    })
    res.status(200).json({ message: 'Task added successfully' });
    }
    
})

router.post('/delete-task', async (req, res) => {
  const {id, userId } = req.body
    const userIsAdmin = await prisma.user.findUnique({ where: { id: userId } });
    if(userIsAdmin.role !== "ADMIN") return res.status(400).json({ message: 'Only admin can delete task' })

    if(!id) return res.status(400).json({ message: 'Goal id is required' });

    await prisma.task.delete({
        where: {id: id}
    })
    res.status(200).json({ message: 'Task deleted successfully' });
})


export { router as tasksRouter };
