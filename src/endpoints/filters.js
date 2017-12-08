


const initialState = {
  filterTypes:[],
  innerFilterTypes:{}
}


export default {
  entry:'~filters',
  skipFormat: true,
  initialState,
  reducer(state, action){
    switch(action.type){
      case this.types.index.success:
        const filterTypes = action.payload.filter( f => !!f) || []
        return {...state, filterTypes}
      case this.types.show.success:
        const innerFilterTypes = action.payload.filter( f => !!f) || []
        return {...state, [action.type_filter]: innerFilterTypes}
      default:
        return state
    }
  }
}
