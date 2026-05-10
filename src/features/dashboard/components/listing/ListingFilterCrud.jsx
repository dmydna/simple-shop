import DropdownCheck from "@/components/common/DropdownCheck";
import DropdownRange from "@/components/common/DropdownRange";
import FilterBar from "@/features/filters/components/FilterBar";
import { Dropdown, Modal } from "react-bootstrap";

function ListingFilterCrud({show, onHide ,dataSource, onApply, className}) {

    return (
        <div className={`position-relative d-block  ${show ? 'opacity-1' : 'opacity-0' }`}>
      <Dropdown
      style={{
        position: 'absolute',
        top: '-10px',
        right: '0',
        left: '0',
        zIndex: 1000, width: '100%'
      }}
        show={show}
        align="start"
        className={''}
        onToggle={onHide}
      >  
        <Dropdown.Menu className='w-100 p-3'>
        <FilterBar  dataSource={dataSource} onApply={onApply} className="" >
            <DropdownCheck variant="light" className="border rounded my-2 flex-fill">
                <span className="fw-semibold">etiquetas</span>
            </DropdownCheck>
            <DropdownRange variant="light" className="border rounded my-2 flex-fill" min={0} max={1500} defaultValue={20} type={'$'}>
                <span className="fw-medium">precio</span>
            </DropdownRange>
        </FilterBar >
        </Dropdown.Menu>

    </Dropdown>
        </div>


    )
}

export default ListingFilterCrud;
