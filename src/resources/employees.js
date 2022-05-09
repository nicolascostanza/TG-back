const employees = require('../data/employees.json');
/* const express = require('express'); */


const getEmployeeById = async (req, res) => {
    const id = req.params.id;
    const employeeFind = employees.find(item => item.id == parseInt(id));
/* 
    console.log('Employee', employeeFind) */

    if (!employeeFind) {
        res.json({
            msg: `This employee with ID ${id} does not exist`
        })
    } res.json({
        data: employeeFind
    })

}
export {
    getEmployeeById
}