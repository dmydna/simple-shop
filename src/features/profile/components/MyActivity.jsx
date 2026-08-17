import PlaceholderIcon from "@common/PlaceholderIcon";

const MyActivity = ({ col = 'col-12 col-md-12 col-lg-6', container = false }) => {

  return (
    <div className={` ${container ? 'mt-4 container' : ''}`}>

      <h5 className="mb-4">Last Activity</h5>

      <div class="list-group list-group-flush">
        <div class="list-group-item border-0 d-flex align-items-center px-0">
          <PlaceholderIcon className="me-3" variant={'primary'} icon={'bi-cart3'} />
          <div class="flex-grow-1">
            <h6 class="mb-1">New order received</h6>
            <p class="text-muted small mb-0">Order #123456 from John Doe</p>
          </div>
          <small class="text-muted">Just now</small>
        </div>
        <div class="list-group-item border-0 d-flex align-items-center px-0">
          <PlaceholderIcon className="me-3" variant={'success'} icon={'bi-person'} />
          <div class="flex-grow-1">
            <h6 class="mb-1">New registered user</h6>
            <p class="text-muted small mb-0">User ID: #987654</p>
          </div>
          <small class="text-muted">2 min ago</small>
        </div>
      </div>

    </div>
  )
}

export default MyActivity;
