import { QuestionMarkCircleIcon } from "@heroicons/react/solid";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Button from "../../components/button";
import ContentHeader from "../../components/content-header";
import Input from "../../components/input";
import LocationSelector from "../../components/location-selector";
import { createTrip, fetchTripDetails } from "../../redux/actions/trip";
import EditPlan from "./edit-plan";
import EditMedia from "./edit-media";
// import { Tab } from '@headlessui/react'
import EditDetails from "./edit-details";
import { Fragment, useEffect } from "react";
import classNames from "classnames";
import EditPrice from "./edit-price";
import Tab from "components/tab";
import EditSchedule from "./edit-schedule";

const TABS = [
  {
    title: 'Informasi Dasar',
    content: EditDetails,
  },
  {
    title: 'Gambar',
    content: EditMedia,
  },
  {
    title: 'Harga',
    content: EditPrice,
  },
  {
    title: 'Rencana',
    content: EditPlan,
  },
  {
    title: 'Jadwal',
    content: EditSchedule,
  },
]

export default function EditTrip() {
  const params = useParams()
  const tripId = params.tripId
  const dispatch = useDispatch()
  const tripDetailsData = useSelector(state => state.trip.dataById[tripId])
  const tripDetailsStatus = useSelector(state => state.trip.queryById[tripId]?.status || 'idle')
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const createStatus = useSelector(state => state.trip.mutationById[0]?.status || 'idle')
  const onSubmit = values => {
    dispatch(createTrip(1, values))
  }

  useEffect(() => {
    dispatch(fetchTripDetails(tripId))
  }, [dispatch, tripId])


  return (
    <div>
      <ContentHeader
        title="Edit Detail Perjalanan"
        subtitle="Masukkan detail perjalanan anda pada form berikut ini."
        actions={
          <Button>Simpan</Button>
        }
      />
      <div>
        <Tab>
          {TABS.map(({ title, content: Content }) => (
            <Tab.Panel tab={title}>
              <Content trip={tripDetailsData} />
            </Tab.Panel>
          ))}
        </Tab>
      </div>
    </div>
  )
}