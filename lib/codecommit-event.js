'use strict'

class CodeCommitEvent {
  constructor (event = {}) {
    this.event = event
  }

  branches () {
    if ((!this.event) || (!this.event.Records)) {
      return []
    }

    return this.event.Records.reduce((accumulator, record) => {
      if (!this.references(record)) {
        return accumulator
      }

      var branches = this.references(record).map(this.getBranchNameFrom)

      return accumulator.concat(branches)
    }, [])
  }

  getBranchNameFrom (reference) {
    var referencePrefix = 'refs/heads/'
    return reference.ref.substr(referencePrefix.length)
  }

  references (record) {
    return (record.codecommit) ? record.codecommit.references : null
  }
}

module.exports = CodeCommitEvent
