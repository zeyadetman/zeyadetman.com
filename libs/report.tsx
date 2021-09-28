import React, { useState, useEffect } from 'react';

const Report = () => {
	const [data, setData] = useState([]);

	useEffect(() => {
		const queryReport = () => {
			if (!window?.gapi?.client) return;

			window.gapi.client
				.request({
					path: '/v4/reports:batchGet',
					root: 'https://analyticsreporting.googleapis.com/',
					method: 'POST',
					body: {
						reportRequests: [
							{
								viewId: process.env.NEXT_PUBLIC_VIEW_ID,
								dateRanges: [
									{
										startDate: '10daysAgo',
										endDate: 'today',
									},
								],
								metrics: [
									{
										expression: 'ga:users',
									},
								],
								dimensions: [
									{
										name: 'ga:date',
									},
								],
							},
						],
					},
				})
				.then(displayResults, console.error.bind(console));
		};

		const displayResults = (response) => {
			const queryResult = response.result.reports[0].data.rows;
			const result = queryResult.map((row) => {
				const dateSting = row.dimensions[0];
				const formattedDate = `${dateSting.substring(0, 4)}
        -${dateSting.substring(4, 6)}-${dateSting.substring(6, 8)}`;
				return {
					date: formattedDate,
					visits: row.metrics[0].values[0],
				};
			});
			setData(result);
		};

		queryReport();
	}, []);

	return (
		<>
			{data.map((row) => (
				<div key={row.date}>{`${row.date}: ${row.visits} visits`}</div> //(3)
			))}
		</>
	);
};

export default Report;
