import { Router } from 'express'
import { startOfHour, parseISO } from 'date-fns'
import AppointmentsRepository from '../repositories/AppointmentRepository'

const appointmentsRouter = Router()
const appointmentsRepository = new AppointmentsRepository()

appointmentsRouter.post('/', (req, res) => {
	const { provider, date } = req.body

	const parsedDate = startOfHour(parseISO(date))

	const findAppointmentInSameDate =
		appointmentsRepository.findByDate(parsedDate)

	if (findAppointmentInSameDate) {
		return res.status(400).json({ message: 'Horário já selecionado' })
	}

	const appointment = appointmentsRepository.create(provider, parsedDate)

	res.status(200).json({ appointment })
})

export default appointmentsRouter
