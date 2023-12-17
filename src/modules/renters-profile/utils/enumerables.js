function titleMapBuilder(list) {
  let titleKeyObjectBuilder = {}
  list.forEach(entry => {
  titleKeyObjectBuilder[entry.name] = entry.title
  })
  return titleKeyObjectBuilder
}

export const status = [
  { name: 'requested', title: 'New Request' },
  { name: 'accepted', title: 'Accepted' },
  { name: 'declined', title: 'Declined' },
  { name: 'retracted', title: 'You Retracted' },
  { name: 'confirmed', title: 'Booking Confirmed' },
  { name: 'modRequestedByUser', title: 'Modification Requested by' },
  { name: 'modRequestOrCancelByUser', title: 'Modification or Cancel Requested by' },
  { name: 'cancelledByUser', title: 'Cancelled by' },
  { name: 'modRequestedByOwner', title: 'You Requested a Modification' },
  { name: 'modRequestOrCancelByOwner', title: 'You requested a Modification' },
  { name: 'cancelledByOwner', title: 'Cancelled by you' },
  { name: 'inProgress', title: 'RENTAL IN PROGRESS' },
  { name: 'completed', title: 'Item Returned' },
  { name: 'closed', title: 'Closed' }
]

export const statusTitleMapOwner = titleMapBuilder(status)

