import React, { useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip);

const InstructorChart = ({dashboardData}) => {
    const [currChart, setCurrChart] = useState("students");
    const randomColors = (numColors) => {
        const colors = [];
        for(let i = 0; i < numColors; i++)
        {
            const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`
            colors.push(color);
        }
        return colors;
    }

    const studentData = {
        labels: dashboardData.map((course) => course?.courseName),
        datasets: [
          {
            label: 'Number of students',
            data: dashboardData.map((course) => course?.totalStudentEnrolled),
            backgroundColor: randomColors(dashboardData?.length),
          },
        ],

    };    

    const incomeData = {
        labels: dashboardData.map((course) => course?.courseName),
        datasets: [
          {
            label: 'Income',
            data: dashboardData.map((course) => course?.totalAmountGenerated),
            backgroundColor: randomColors(dashboardData?.length),
          },
        ],
    }; 
    
    


  return (
    <div className=' text-richblack-50 flex flex-col gap-4 w-[100%]'>
        <p className=' text-richblack-50 font-bold text-[22px]'>Visualize</p>
        <div className=' flex flex-row items-center gap-3'>
            <button onClick={() => {currChart !== "students" && setCurrChart("students")}} className={`${currChart === "students" ? " text-yellow-100 px-2 py-2 bg-richblack-700 font-bold" : " text-yellow-5 px-2 py-2 "}`}>Students</button>
            <button onClick={() => {currChart !== "income" && setCurrChart("income")} } className={`${currChart === "income" ? " text-yellow-100 px-2 py-2 bg-richblack-700 font-bold" : " text-yellow-5 px-2 py-2 "}`}>Income</button>
        </div>
        <div className=' w-[100%] h-[450px]'>
            <Pie data={currChart === "students" ? studentData : incomeData} options={{ maintainAspectRatio: false, width : 400, height : 400}} />

        </div>
    </div>
  )
}

export default InstructorChart