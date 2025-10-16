import { logger } from '../../services/logger.service.js'
import { dbService } from '../../services/db.service.js'
import { ObjectId } from 'mongodb'

export const stayService = {
	query,
	getById,
	add,
	update,

}

async function query(filterBy = { txt: '', capacity: 1 }, sortBy) {

	try {
		const{page, limit} = filterBy
		const criteria = _buildCriteria(filterBy)
		const sort = _buildSort(sortBy)
		const skip = ( page - 1) * limit

		const collection = await dbService.getCollection('stay')
		var stayCursor = await collection.find(criteria, {sort}).skip(skip).limit(limit)


		const stays = stayCursor.toArray()
		return stays
	} catch (err) {
		logger.error('cannot find stays', err)
		throw err
	}
}

function _buildCriteria(filterBy) {
	const criteria = {
		'loc.city': { $regex: filterBy.txt, $options: 'i' },
		capacity: { $gte: filterBy.capacity },
	}

	if (filterBy.hostId && filterBy.hostId !== '') {
	   criteria['host._id'] = ObjectId.createFromHexString(filterBy.hostId)
   }
	return criteria
}

function _buildSort(sortBy) {	
    if (!sortBy.type) return {}
    let type = sortBy.type 

  const dir = sortBy.dir 
  return { [type]: dir }
}

async function getById(stayId) {
	try {
		const criteria = { _id: ObjectId.createFromHexString(stayId) }

		const collection = await dbService.getCollection('stay')
		const stay = await collection.findOne(criteria)

		stay.createdAt = stay._id.getTimestamp()
		return stay
	} catch (err) {
		logger.error(`while finding stay ${stayId}`, err)
		throw err
	}
}


async function add(stay) {
	try {
		const collection = await dbService.getCollection('stay')
		await collection.insertOne(stay)

		return stay
	} catch (err) {
		logger.error('cannot insert stay', err)
		throw err
	}
}

async function update(stay) {
	const stayToSave = {
		name: stay.name,
		type: stay.type,
		imgUrls: stay.imgUrls,
		price: stay.price,
		summary: stay.summary,
		capacity: stay.capacity,
		amenities: stay.amenities,
		bathrooms: stay.bathrooms,
		bedrooms: stay.bedrooms,
		roomType: stay.roomType,
		loc: stay.loc,
		host: stay.host,
		reviews: stay.reviews,
		likedByUsers: stay.likedByUsers,
	}

	try {
		const criteria = { _id: ObjectId.createFromHexString(stay._id) }
		const collection = await dbService.getCollection('stay')
		await collection.updateOne(criteria, { $set: stayToSave })

		return stay
	} catch (err) {
		logger.error(`cannot update stay ${stay._id}`, err)
		throw err
	}
}

