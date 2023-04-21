import React from 'react'

import { Link } from 'react-router-dom'

const FlipCard = () => {
	return (
		<div class="section">
			<div class="container">
				<div class="row full-height justify-content-center">
					<div class="col-12 text-center align-self-center ">
						<img
							width="200"
							height="200"
							src="https://drive.google.com/uc?id=1mtSbUTd67zUg50RHUpSuWR9UNS9C8F34"
							alt="Logo Image"
						/>
						<h1 className="page-title">CareConnect</h1>
						<p style={{ marginBottom: '20px' }}>
							Mejora la salud de todos, registra la información
							médica en plataforma digital confiable.
						</p>
						<div class="section pb-5 pt-5 pt-sm-2 text-center">
							<h6 class="mb-0 pb-3">
								<span>Medico</span>
								<span>Admin</span>
							</h6>
							<input
								class="checkbox"
								type="checkbox"
								id="reg-log"
								name="reg-log"
							/>
							<label for="reg-log"></label>
							<div class="card-3d-wrap mx-auto">
								<div class="card-3d-wrapper">
									<div class="card-front">
										<div class="center-wrap">
											<div class="section text-center">
												<img
													width="220"
													height="220"
													src="https://drive.google.com/uc?id=1mHk2fIgqIvrdjkTNwIChnVvNBoOsjXt1"
													alt="Logo Image"
												/>
												<h4 className="card-title">
													Medico
												</h4>

												<Link
													class="btn mt-4 mb-4"
													to="/login"
													style={{
														textDecoration: 'none',
														marginRight: '15px',
													}}
												>
													Sign in
												</Link>
												<Link
													class="btn mt-4 mb-4"
													to="/signup"
													style={{
														textDecoration: 'none',
														marginLeft: '15px',
													}}
												>
													Sign up
												</Link>
											</div>
										</div>
									</div>
									<div class="card-back">
										<div class="center-wrap">
											<div class="section text-center">
												<img
													width="220"
													height="220"
													src="https://drive.google.com/uc?id=1j-jweqS4W6pcKlIi0rPSWAkWAFZk0j3b"
													alt="Logo Image"
												/>
												<h4 className="card-title">
													Administrador
												</h4>
												<Link
													class="btn mt-4 mb-4"
													to="/admin/login"
													style={{
														textDecoration: 'none',
														marginRight: '15px',
													}}
												>
													Sign in
												</Link>
												<Link
													class="btn mt-4 mb-4"
													to="/admin/signup"
													style={{
														textDecoration: 'none',
														marginLeft: '15px',
													}}
												>
													Sign up
												</Link>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default FlipCard
