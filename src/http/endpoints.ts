/**
 * Your endpoints will go here
 * NOTE: Each endpoint will be store in a separate variable.
 * Currently we don't have auth endpoint so this is just an example endpoint which i have added.
 */
export const USER_AUTH = "/login";
export const KPI = "/kpis";
export const KPI_ID = "/kpis/:id";
export const DEL_KPI = "/kpis/:id";
export const APPRAISAL_FLOW = "/appraisal_flows";
export const APPRAISALS = "/appraisals";
export const APPRAISALS_BY_ID = "/appraisals/:id";
export const DEL_APPRAISAL = "/appraisal_flows/:id";
export const APPRAISAL_FLOW_ID = "/appraisal_flows/:id";
export const GET_APPRAISAL = "/appraisals";
export const GET_APPRAISALKPIS_BY_EMPID = "/appraisals/employees/:id/appraisal_kpis";
export const GET_ALL_PROJECTS = "/appraisals/getallprojects";

export const APPRAISAL_ID = "/appraisals/:id";
export const DEL_APPRAISALS = "/appraisals/:id";
export const SCORE = "/appraisals/:id/employees/:emp_id/appraisals";
// TOSS ENDPOINTS
export const PROJECTS = "/Project/GetAllProjects";
export const PROJECTS_BY_ID = "/Project/:id/Supervisor";
export const EMPLOYEE_DESIGNATION = "/Employee/GetDesignationsList";
export const EMPLOYEES = "/Employee/GetAllEmployees?=true";
export const EMPLOYEES_BY_ID = "/Employee/:id";
