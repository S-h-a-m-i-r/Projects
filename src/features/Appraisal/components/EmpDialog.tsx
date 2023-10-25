import * as React from "react";
import { Box, Dialog, Button, DialogContent, Stack, Typography } from "@mui/material";
import { Avatar } from "@mui/material";
import Input from "components/Input";

type EmpDialogProps = {
	open: boolean;
	onClose: () => void;
	imageSrc: string;
	name: string;
	position: string;
};
const EmpDialog: React.FC<EmpDialogProps> = ({ open, onClose, imageSrc, name, position }) => {
	const [showAddPeer, setShowAddPeer] = React.useState(false);
	const [showAddKPI, setShowAddKPI] = React.useState(false);
	const [kpiInputs, setKpiInputs] = React.useState<string[]>([]);
	const handleAddPeerClick = () => {
		setShowAddPeer(true);
		setShowAddKPI(false);
	};
	const handleAddKPIClick = () => {
		setShowAddKPI(true);
		setShowAddPeer(false);
	};
	const handleAddKPIInput = () => {
		setKpiInputs([...kpiInputs, ""]);
	};
	return (
		<Dialog open={open} onClose={onClose}>
			<DialogContent sx={{ padding: 4 }}>
				<Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
					<Box
						sx={{
							display: "flex",
							flexDirection: "row",
							alignItems: "center",
							marginBottom: (theme) => theme.spacing(5),
							marginTop: (theme) => theme.spacing(10),
						}}
					>
						<Button
							type="submit"
							variant="contained"
							fullWidth
							size="large"
							onClick={handleAddPeerClick}
							sx={{
								borderRadius: (theme) => theme.shape.borderRadius * 0.1,
								marginRight: (theme) => theme.spacing(15),
								marginLeft: (theme) => theme.spacing(5),
								padding: (theme) => theme.spacing(2, 2, 2, 2),
								minWidth: 130,
							}}
						>
							Add Peer
						</Button>
						<Button
							type="submit"
							variant="contained"
							fullWidth
							size="large"
							onClick={handleAddKPIClick}
							sx={{
								padding: (theme) => theme.spacing(2, 10),
								minWidth: 130,
							}}
						>
							Add KPI
						</Button>
					</Box>
					<Avatar
						alt="Employee Image"
						src={imageSrc}
						sx={{ width: 150, height: 150, marginTop: (theme) => theme.spacing(10) }}
					/>
					<Typography variant="h6">{name}</Typography>
					<Typography variant="body1">{position}</Typography>
					<Stack spacing={1} sx={{ my: 10, display: "flex", flexDirection: "column", alignItems: "center" }}>
						{showAddPeer && (
							<Button
								type="submit"
								variant="contained"
								fullWidth
								size="large"
								sx={{
									padding: (theme) => theme.spacing(2),
									minWidth: 130,
								}}
							>
								Add Peer
							</Button>
						)}
						{showAddKPI && (
							<Box sx={{ mt: 5, display: "flex", flexDirection: "column", alignItems: "center", minWidth: 300 }}>
								{kpiInputs.map((_, index) => (
									<Input
										key={index}
										size="medium"
										fullWidth
										placeholder="Add KPI"
										required
										sx={{
											boxShadow: (theme) => theme.palette.advancedShadow.mediumShadow,
											marginBottom: (theme) => theme.spacing(5),
										}}
									/>
								))}
								<Button
									type="submit"
									variant="contained"
									fullWidth
									size="large"
									onClick={handleAddKPIInput}
									sx={{
										borderRadius: (theme) => theme.shape.borderRadius * 0.1,
										padding: (theme) => theme.spacing(2, 2, 2, 2),

										marginTop: (theme) => theme.spacing(2),
									}}
								>
									Add Personal KPI
								</Button>
							</Box>
						)}
					</Stack>
				</Box>
			</DialogContent>
		</Dialog>
	);
};

export default EmpDialog;
