export interface IJobFilterProps {
  state: {
    label: string
    options: { title: string; value: string | number }[]
    width: number
  }
  actions: {
    handleSelectedFilter: (
      event: React.SyntheticEvent<Element, Event>,
      alue: {
        title: string
        value: string | number
      } | null
    ) => void
  }
}

export type handleSelectedFilterParams = {
  event: React.SyntheticEvent<Element, Event>
  alue: {
    title: string
    value: string | number
  } | null
}
