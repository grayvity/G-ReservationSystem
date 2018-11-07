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
                      <div class="col-md-3">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Дугаар</label>
                          <div class="col-sm-9">
                            <input type="text" class="form-control" readonly/>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-3">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Огноо</label>
                          <div class="col-sm-9">
                             <input type="date" name="bday" date-format="yyyy/mm/dd" max="3000-12-31" min="1000-01-01" class="form-control">
                          </div>
                        </div>
                      </div>
                      <div class="col-md-3">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Банкаар</label>
                          <div class="col-sm-9">
                            <input type="number" pattern="^\d+(\.|\,)\d{2}$" min=0 class="form-control" value="0.00">
                          </div>
                        </div>
                      </div>
                      <div class="col-md-3">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Бэлнээр</label>
                          <div class="col-sm-9">
                            <input type="number" pattern="^\d+(\.|\,)\d{2}$" min=0 class="form-control" value="0.00">
                          </div>
                        </div>
                      </div>
                    </div>
                    <p class="card-description font-weight-bold">
                      Захиалагчын мэдээлэл
                    </p>
                    <div class="row">
                      <div class="col-md-3">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Нэр</label>
                          <div class="col-sm-9">
                            <input type="text" class="form-control" />
                          </div>
                        </div>
                      </div>
                      <div class="col-md-3">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Төрөл</label>
                          <div class="col-sm-9">
                            <input type="text" class="form-control" />
                          </div>
                        </div>
                      </div>
                      <div class="col-md-3">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Утас</label>
                          <div class="col-sm-9">
                            <input type="text" class="form-control" />
                          </div>
                        </div>
                      </div>
                      <div class="col-md-3">
                        <div class="form-group row">
                          <label class="col-sm-3 col-form-label">Имэйл</label>
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
                      <div class="col-md-12">
                        <textarea class="form-control" id="exampleTextarea1" rows="2"></textarea>
                      </div>
                    </div>
                    <div style="margin-top: 15px;" class="row">
                      <div class="col-md-2">
                        <p class="card-description font-weight-bold">
                          Өрөөний мэдээлэл
                        </p>
                      </div>
                      <div class="col">
                        <a data-toggle="collapse" data-target=".multi-collapse1" role="button" aria-expanded="true" aria-controls="roomCollapse roomAddCollapse">
                          <i class="fa fa-toggle-down"></i>
                        </a>
                      </div>
                      <div class="col">
                        <div id="roomAddCollapse" class="multi-collapse1 show"  style="text-align:right;">
                          <button  type="button" class="btn btn-primary btn-sm" >
                            <i class="fa fa-plus"></i>нэмэх
                          </button>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-12">
                        <div id="roomCollapse" class="table-responsive multi-collapse1 show">
                          <table class="table table-hover">
                            <thead>
                              <tr>
                                <th class="text-center">Өрөө,гэр #</th>
                                <th class="text-center">Том хүн</th>
                                <th class="text-center">Хүүхэд</th>
                                <th class="text-center">Орох огноо</th>
                                <th class="text-center">Гарах огноо</th>
                                <th class="text-center">Тайлбар</th>
                                <th class="text-center">Дүн</th>
                                <th class="text-center"></th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td class="pt-3-half" >
                                  <select class="form-control">
                                    <option selected>Сонгоно уу</option>
                                    <option value="1">Гэр #1</option>
                                    <option value="2">Гэр #2</option>
                                    <option value="3">Гэр #3</option>
                                  </select>
                                </td>
                                <td class="pt-3-half" >
                                  <input class="form-control" type="number" min=0 placeholder="Оруулна уу">
                                </td>
                                <td class="pt-3-half" >
                                  <input class="form-control" type="number" min=0 placeholder="Оруулна уу">
                                </td>
                                <td class="pt-3-half" >
                                  <input type="date" name="bday" date-format="yyyy/mm/dd" max="3000-12-31" min="1000-01-01" class="form-control">
                                </td>
                                <td class="pt-3-half" >
                                  <input type="date" name="bday" date-format="yyyy/mm/dd" max="3000-12-31" min="1000-01-01" class="form-control">
                                </td>
                                <td class="pt-3-half" >
                                  <input class="form-control" type="text" placeholder="Оруулна уу">
                                </td>
                                <td class="pt-3-half" >
                                  <input class="form-control" type="number" pattern="(^\d+(\.|\,)\d{2}$)" min=0 placeholder="Оруулна уу">
                                </td>
                                <td class="pt-3-half">
                                  <a href="javascript:;" style="margin-left: 10px;">
                                    <i class="fa fa-trash-o" style="color:red"></i>
                                  </a>
                                </td>
                              </tr>
                              <tr>
                                <td class="pt-3-half" >
                                  <select class="form-control">
                                    <option selected>Сонгоно уу</option>
                                    <option value="1">Гэр #1</option>
                                    <option value="2">Гэр #2</option>
                                    <option value="3">Гэр #3</option>
                                  </select>
                                </td>
                                <td class="pt-3-half" >
                                  <input class="form-control" type="number" min=0 placeholder="Оруулна уу">
                                </td>
                                <td class="pt-3-half" >
                                  <input class="form-control" type="number" min=0 placeholder="Оруулна уу">
                                </td>
                                <td class="pt-3-half" >
                                  <input type="date" name="bday" date-format="yyyy/mm/dd" max="3000-12-31" min="1000-01-01" class="form-control">
                                </td>
                                <td class="pt-3-half" >
                                  <input type="date" name="bday" date-format="yyyy/mm/dd" max="3000-12-31" min="1000-01-01" class="form-control">
                                </td>
                                <td class="pt-3-half" >
                                  <input class="form-control" type="text" placeholder="Оруулна уу">
                                </td>
                                <td class="pt-3-half" >
                                  <input class="form-control" type="number" pattern="(^\d+(\.|\,)\d{2}$)" min=0 placeholder="Оруулна уу">
                                </td>
                                <td class="pt-3-half">
                                  <a href="javascript:;" style="margin-left: 10px;">
                                    <i class="fa fa-trash-o" style="color:red"></i>
                                  </a>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          </div>
                      </div>
                    </div>
                    <div style="margin-top: 15px;" class="row">
                      <div class="col-md-2">
                        <p class="card-description font-weight-bold">
                          Үйлчилгээний мэдээлэл
                        </p>
                      </div>
                      <div class="col">
                        <a data-toggle="collapse" data-target=".multi-collapse" role="button" aria-expanded="true" aria-controls="serviceCollapse serviceAddCollapse">
                          <i class="fa fa-toggle-down"></i>
                        </a>
                      </div>
                      <div class="col">
                        <div id="serviceAddCollapse" class="multi-collapse show"  style="text-align:right;">
                          <button  type="button" class="btn btn-primary btn-sm" >
                            <i class="fa fa-plus"></i>нэмэх
                          </button>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-12">
                        <div id="serviceCollapse" class="table-responsive multi-collapse show">
                          <table class="table table-hover">
                            <thead>
                              <tr>
                                <th class="text-center">Нэр</th>
                                <th class="text-center">Тайлбар</th>
                                <th class="text-center">Дүн</th>
                                <th class="text-center"></th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td class="pt-3-half" >
                                  <select class="form-control">
                                    <option selected>Сонгоно уу</option>
                                    <option value="1">Гэр #1</option>
                                    <option value="2">Гэр #2</option>
                                    <option value="3">Гэр #3</option>
                                  </select>
                                </td>
                                <td class="pt-3-half" >
                                  <input class="form-control" type="text" placeholder="Оруулна уу">
                                </td>
                                <td class="pt-3-half" >
                                  <input class="form-control" type="number" pattern="(^\d+(\.|\,)\d{2}$)" min=0 placeholder="Оруулна уу">
                                </td>
                                <td class="pt-3-half">
                                  <a href="javascript:;" style="margin-left: 10px;">
                                    <i class="fa fa-trash-o" style="color:red"></i>
                                  </a>
                                </td>
                              </tr>
                              <tr>
                                <td class="pt-3-half" >
                                  <select class="form-control">
                                    <option selected>Сонгоно уу</option>
                                    <option value="1">Гэр #1</option>
                                    <option value="2">Гэр #2</option>
                                    <option value="3">Гэр #3</option>
                                  </select>
                                </td>
                                <td class="pt-3-half" >
                                  <input class="form-control" type="text" placeholder="Оруулна уу">
                                </td>
                                <td class="pt-3-half" >
                                  <input class="form-control" type="number" pattern="(^\d+(\.|\,)\d{2}$)" min=0 placeholder="Оруулна уу">
                                </td>
                                <td class="pt-3-half">
                                  <a href="javascript:;" style="margin-left: 10px;">
                                    <i class="fa fa-trash-o" style="color:red"></i>
                                  </a>
                                </td>
                              </tr>
                            </tbody>
                          </table>
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
}

</script>