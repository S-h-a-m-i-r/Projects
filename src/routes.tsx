import { UpdateAppraisalPage, ViewAppraisalPage } from "features";
import AddEmployee from "features/Appraisal/components/AddEmployee";
import Appraisal from "features/Appraisal/components/Appraisal";
import AuthGuard from "guards/AuthGuard";
import {
	LandingPage,
	RegisterPage,
	LoginPage,
	DashboardPage,
	AppraisalFlowPage,
	CreateAppraisalflowPage,
	AppraisalPage,
	KpiListPage,
	ErrorPage,
	UpdateAppraisalflowPage,
	TodoPage,
	ViewPage,
	EmployeeAppraisalPage,
	KpiViewPage,
} from "pages";
type ROUTES = {
	path: string;
	element: React.ReactNode;
};
export const routes: ROUTES[] = [
	{
		path: "/",
		element: <LandingPage />,
	},
	{
		path: "/signup",
		element: <RegisterPage />,
	},
	{
		path: "/login",
		element: <LoginPage />,
	},
	{
		path: "/dashboard",
		element: <DashboardPage />,
	},
	{
		path: "/dashboard/:id",
		element: (
			<AuthGuard>
				<DashboardPage />
			</AuthGuard>
		),
	},
	{
		path: `/appraisalform/:id`,
		element: (
			<AuthGuard>
				<UpdateAppraisalPage />
			</AuthGuard>
		),
	},
	{
		path: `/appraisalview/:id`,
		element: (
			<AuthGuard>
				<ViewAppraisalPage />
			</AuthGuard>
		),
	},
	{
		path: `/editAppraisal/:id`,
		element: (
			<AuthGuard>
				<UpdateAppraisalflowPage />
			</AuthGuard>
		),
	},
	{
		path: "/appraisalflow",
		element: (
			<AuthGuard>
				<AppraisalFlowPage />
			</AuthGuard>
		),
	},
	{
		path: "/createappraisal",
		element: (
			<AuthGuard>
				<CreateAppraisalflowPage />
			</AuthGuard>
		),
	},
	{
		path: "/createappraisal/:id",
		element: (
			<AuthGuard>
				<CreateAppraisalflowPage />
			</AuthGuard>
		),
	},
	{
		path: "/appraisalform",
		element: (
			<AuthGuard>
				<Appraisal />
			</AuthGuard>
		),
	},
	{
		path: "/appraisal",
		element: (
			<AuthGuard>
				<AppraisalPage />
			</AuthGuard>
		),
	},
	{
		path: "*",
		element: <ErrorPage />,
	},
	{
		path: "/kpilists",
		element: (
			<AuthGuard>
				<KpiListPage />
			</AuthGuard>
		),
	},
	{
		path: "/addemployee",
		element: (
			<AuthGuard>
				<AddEmployee />
			</AuthGuard>
		),
	},
	{
		path: "/todo",
		element: (
			<AuthGuard>
				<TodoPage />
			</AuthGuard>
		),
	},
	{
		path: "/view/:id",
		element: (
			<AuthGuard>
				<ViewPage />
			</AuthGuard>
		),
	},
	{
		path: "/appraisals/employees/:id/appraisal_kpis",
		element: (
			<AuthGuard>
				<EmployeeAppraisalPage />
			</AuthGuard>
		),
	},
	{
		path: "/ViewTeamKpi",
		element: <KpiViewPage />,
	},
];
