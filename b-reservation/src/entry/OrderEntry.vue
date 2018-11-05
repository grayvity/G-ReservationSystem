<template>
    <!-- Modal -->
    <div class="modal fade" id="orderEntryModal" tabindex="-1" role="dialog" aria-labelledby="orderEntryModalCenterTitle" aria-hidden="true">
        <div style="max-width: none; width: 90%;" class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="orderEntryModalLongTitle">Захиалга бүртгэл</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form class="forms-sample">
                    <p class="card-description font-weight-bold">
                      Захиалгын мэдээлэл
                    </p>
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Дугаар</label>
                          <div class="col-sm-9">
                            <input type="text" class="form-control" />
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Огноо</label>
                          <div class="col-sm-9">
                            <input type="text" class="form-control" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <p class="card-description font-weight-bold">
                      Захиалагчын мэдээлэл
                    </p>
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Нэр</label>
                          <div class="col-sm-9">
                            <select class="form-control">
                              <option>Male</option>
                              <option>Female</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Төрөл</label>
                          <div class="col-sm-9">
                            <input class="form-control" placeholder="dd/mm/yyyy" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Утас</label>
                          <div class="col-sm-9">
                            <select class="form-control">
                              <option>Category1</option>
                              <option>Category2</option>
                              <option>Category3</option>
                              <option>Category4</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Имэйл</label>
                          <div class="col-sm-4">
                            <div class="form-radio">
                              <label class="form-check-label">
                                <input type="radio" class="form-check-input" name="membershipRadios" id="membershipRadios1" value="" checked> Free
                              </label>
                            </div>
                          </div>
                          <div class="col-sm-5">
                            <div class="form-radio">
                              <label class="form-check-label">
                                <input type="radio" class="form-check-input" name="membershipRadios" id="membershipRadios2" value="option2"> Professional
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p class="card-description font-weight-bold">
                      Төлбөрийн мэдээлэл
                    </p>
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Банкаар</label>
                          <div class="col-sm-9">
                            <input type="text" class="form-control" />
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Бэлнээр</label>
                          <div class="col-sm-9">
                            <input type="text" class="form-control" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <p class="card-description font-weight-bold">
                      Нэмэлт мэдээлэл
                    </p>
                    <div class="row">
                      <textarea class="form-control" id="exampleTextarea1" rows="2"></textarea>
                    </div>
                    <p class="card-description font-weight-bold">
                      Өрөөний мэдээлэл
                    </p>
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">City</label>
                          <div class="col-sm-9">
                            <input type="text" class="form-control" />
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Country</label>
                          <div class="col-sm-9">
                            <select class="form-control">
                              <option>America</option>
                              <option>Italy</option>
                              <option>Russia</option>
                              <option>Britain</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button class="btn btn-light" data-dismiss="modal">Болих</button>
                <button type="submit" class="btn btn-success mr-2">Хадгалах</button>
            </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
  name: 'OrderEntry',
  data(){
    return{
      info: {}
    }
  },
  created(){
    // getServiceList();
  },
  methods: {
    async save(){
        try{
            const res = await fetch("/api/v1/save-service", {
                method: "POST"
            });
            const resJson = await res.json();
        }catch(err){

        }
     

      
    }
  }
}

</script>