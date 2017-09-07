'use strict'

class CodeCommitEvent {
  constructor (event = {}) {
    this.event = event
  }

  getBranches () {
    return this._getRecords().reduce((branchNames, record) => {
      var recordBranches = this._getReferencesFrom(record)
        .map((reference) => this._getBranchNameFrom(reference))

      return branchNames.concat(recordBranches)
    }, [])
  }

  _getRecords () {
    if ((!this.event) || (!this.event.Records)) {
      return []
    }

    return this.event.Records
  }

  _getReferencesFrom (record) {
    return (record.codecommit && record.codecommit.references) ? record.codecommit.references : []
  }

  _getBranchNameFrom (reference) {
    var referencePrefix = 'refs/heads/'
    return reference.ref.substr(referencePrefix.length)
  }
}

module.exports = CodeCommitEvent
