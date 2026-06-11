import React, { useState } from "react";


function FeedbackError({ error, detailedMessage }) {

	const [showDetails, setShowDetails] = useState(false);

	const toggleDetails = () => setShowDetails(!showDetails);

	return (
		<>
			<div style={{ marginTop: '10px', marginBottom: '30px', paddingTop: '10px' }}>
				<button 
					className='btn-sm small'
					onClick={toggleDetails}
					style={{ 
						background: 'none', 
						border: 'none', 
						color: '#007bff', 
						cursor: 'pointer', 
						textDecoration: 'underline' 
					}}
				>
					{showDetails ? "Ocultar detalles técnicos" : "Ver detalles técnicos"}
				</button>

				{showDetails && (
					<div style={{ 
						marginTop: '10px', 
						padding: '10px', 
						background: '#f8f9fa', 
						borderRadius: '4px',
						border: '1px solid #dee2e6',
						maxHeight: '200px',
						overflowY: 'auto',
						fontSize: '0.85rem',
						fontFamily: 'monospace',
						textAlign: 'start'
					}}>
					<p className='small'><strong>Mensaje:</strong> {detailedMessage}</p>
					{error?.status &&
						<p className='small'><strong>Estado:</strong> {error?.status || 'N/A'}</p>}
					{error?.path && 
						<p className='small'><strong>Ruta:</strong> {error?.path || 'N/A'}</p>}
					{error?.timestamp && 
					    <p className='small'><strong>Fecha:</strong> {error?.timestamp.toLocaleString()}</p>
				    }
				    {error?.code && 
					    <p className='small'><strong>Code:</strong> {error?.code}</p>
				    }
				    {error?.rawData && 
				        <p className='small'><strong>Debug:</strong> {JSON.stringify(error.rawData)} </p>
				    }
				</div>
				)}
			</div>
	</>
	)
}


export default FeedbackError;