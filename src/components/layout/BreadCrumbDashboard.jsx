import { useUrlParams } from '@/hooks/useUrlParams';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Link } from 'react-router-dom';

// FIXME: no filtra category desde BreadCrumb
export default function BreadCrumbDashboard({ className }) {

    const { idParam } = useUrlParams()
    const [root, dashboard, current] = window.location.pathname.split("/")

    const alias = {
        'product-form': 'Productos',
        'product-list': 'Productos',
        'listing-form': 'Publicaciones',
        'listing-list': 'Publicaciones',
        'user-form': 'Usuarios',
        'user-list': 'Usuarios',
    }

    const redirect = {
        'product-form': 'product-list',
        'user-form': 'user-list',
        'listing-form': 'listing-list',
    }


    return (
        <>
            <style>{`
         .breadcrumb-item a { text-decoration: none; color: gray  }
         .breadcrumb-item:last-child a { text-decoration: underline; color: blue  }   
        `}</style>
            <div className={className}>
                <div className='d-flex justify-content-between mb-3'>
               
                    <div className='h5 text-capitalize'>{alias[current]}</div>

                    <Breadcrumb className='small'>
                        <Breadcrumb.Item className='' linkAs={Link} linkProps={{ to: '/dashboard' }}>
                            Dashboard
                        </Breadcrumb.Item>
                        <Breadcrumb.Item linkAs={Link} linkProps={{ to: `/dashboard/${redirect[current] || current}` }}>
                            {alias[current] || current}
                        </Breadcrumb.Item>
                        {idParam && (
                            <Breadcrumb.Item linkAs={Link} linkProps={{ to: `/dashboard/${redirect[current] || current}` }}>
                                {idParam}
                            </Breadcrumb.Item>
                        )}

                    </Breadcrumb>
                </div>


            </div>
        </>
    );
}
