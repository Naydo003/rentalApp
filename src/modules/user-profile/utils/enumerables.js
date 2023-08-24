function titleMapBuilder(list) {
  let titleKeyObjectBuilder = {}
  list.forEach(entry => {
  titleKeyObjectBuilder[entry.name] = entry.title
  })
  return titleKeyObjectBuilder
}

export const status = [
  { name: 'requested', title: 'Request Sent' },
  { name: 'accepted', title: 'Accepted' },
  { name: 'declined', title: 'Declined' },
  { name: 'retracted', title: 'You Retracted' },
  { name: 'confirmed', title: 'Booking Confirmed' },
  { name: 'modRequestedByUser', title: 'Modification Request Sent' },
  { name: 'modRequestOrCancelByUser', title: 'Modification or Cancel Sent' },
  { name: 'cancelledByUser', title: 'Cancelled by You' },
  { name: 'modRequestedByOwner', title: 'Modification Requested by' },
  { name: 'modRequestOrCancelByOwner', title: 'Modification Requested by' },
  { name: 'cancelledByOwner', title: 'Cancelled by' },
  { name: 'inProgress', title: 'RENTAL IN PROGRESS' },
  { name: 'completed', title: 'Item Returned' },
  { name: 'closed', title: 'Closed' }
]

export const statusTitleMap = titleMapBuilder(status)

