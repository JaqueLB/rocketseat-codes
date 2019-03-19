const kue = require('kue')
const Sentry = require('@sentry/node')
const redisConfig = require('../../config/redis')
const jobs = require('../jobs') // possible because we have an index.js exporting every file of this dir

const Queue = kue.createQueue({ redis: redisConfig })

// process all PurchaseMail keys calling handle
Queue.process(jobs.PurchaseMail.key, jobs.PurchaseMail.handle)

Queue.on('error', Sentry.captureException)

module.exports = Queue
