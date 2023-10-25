import React from "react";
import DeleteModal from "./Delete";
import { useState } from "react";
import { useAppDispatch } from "hooks/reduxHook";
import { TableCell, TableBody, TableRow, Typography } from "@mui/material";
import { APPRAISAL } from "libs/redux/appraisals/appraisal.action";
import { delAppraisalList } from "libs/redux/appraisals/appraisal.action";
import Link from "components/Link";

interface AppraisalsRowProps {
	appraisal: APPRAISAL;
}

const AppraisalsRow: React.FC<AppraisalsRowProps> = ({ appraisal }) => {
	const dispatch = useAppDispatch();

	const [showDeletedModal, setDeletedModal] = useState<boolean>(() => false);

	const handleDelete = (id: number) => {
		dispatch(delAppraisalList(id));
	};

	return (
		<>
			<TableBody>
				<TableRow
					sx={{
						borderRadius: (theme) => theme.shape.borderRadius * 0.2,
						width: "100%",
						"&:last-child": {
							marginBottom: 0,
						},
					}}
				>
					<TableCell>
						<Typography>{appraisal.appraisal_name}</Typography>
					</TableCell>
					<TableCell>{appraisal.appraisal_year}</TableCell>
					<TableCell>{appraisal.appraisal_type}</TableCell>
					<TableCell>{appraisal.supervisor_name}</TableCell>
					<TableCell>{appraisal.appraisal_flow.flow_name}</TableCell>
					<TableCell>{appraisal.status ? "complete" : "pending"}</TableCell>
					<TableCell sx={{ justifyContent: "space-between" }}>
						<Link
							to={`/appraisalform/${appraisal.id}`}
							sx={{
								marginRight: 3,
								backgroundColor: "bw.greybtn",
								color: "bw.black",
								padding: (theme) => theme.spacing(3, 6, 3, 6),
								fontSize: (theme) => theme.typography.fontSize * 1.2,
								borderRadius: (theme) => theme.shape.borderRadius * 0.1,
								Width: "20%",

								":hover": {
									backgroundColor: "bw.white",
									color: "bw.black",
								},
							}}
						>
							View
						</Link>
						<Link
							to={`/appraisalform/${appraisal.id}`}
							sx={{
								marginRight: 3,
								backgroundColor: "bw.green",
								color: "bw.white",
								padding: (theme) => theme.spacing(3, 7.5, 3, 7.5),
								fontSize: (theme) => theme.typography.fontSize * 1.2,
								borderRadius: (theme) => theme.shape.borderRadius * 0.1,
								Width: "20%",
								":hover": {
									backgroundColor: "bw.white",
									color: "bw.black",
								},
							}}
						>
							Edit
						</Link>
						<Link
							to="#"
							onClick={() => setDeletedModal(true)}
							sx={{
								marginRight: 3,
								backgroundColor: (theme) => theme.palette.primary.main,
								color: "bw.white",
								padding: (theme) => theme.spacing(3, 6, 3, 6),
								fontSize: (theme) => theme.typography.fontSize * 1.2,
								borderRadius: (theme) => theme.shape.borderRadius * 0.1,
								Width: "20%",
								":hover": {
									backgroundColor: "bw.white",
									color: "bw.black",
								},
							}}
						>
							Delete
						</Link>
					</TableCell>
				</TableRow>
			</TableBody>
			<DeleteModal
				open={showDeletedModal}
				handleOnClose={() => setDeletedModal(false)}
				appraisal={appraisal}
				onDelete={() => {
					if (appraisal.id) handleDelete(appraisal.id);
				}}
			/>
		</>
	);
};

export default AppraisalsRow;
