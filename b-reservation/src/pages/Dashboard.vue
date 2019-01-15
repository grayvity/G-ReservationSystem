<template>
  <div class="content-wrapper">
    <div class="row">
      <div class="col-xl-3 col-lg-3 col-md-3 col-sm-6 grid-margin stretch-card">
        <div class="card card-statistics">
          <div class="card-body">
            <div class="clearfix">
              <div class="float-left">
                <i class="mdi mdi-cube text-danger icon-lg"></i>
              </div>
              <div class="float-right">
                <p class="mb-0 text-right">Өрөө</p>
                <div class="fluid-container">
                  <h3 class="font-weight-medium text-right mb-0">{{info.room_count}}</h3>
                </div>
              </div>
            </div>
            <p class="text-muted mt-3 mb-0">
              <i class="mdi mdi-alert-octagon mr-1" aria-hidden="true"></i> Нийт өрөөний тоо
            </p>
          </div>
        </div>
      </div>
      <div class="col-xl-3 col-lg-3 col-md-3 col-sm-6 grid-margin stretch-card">
        <div class="card card-statistics">
          <div class="card-body">
            <div class="clearfix">
              <div class="float-left">
                <i class="mdi mdi-receipt text-warning icon-lg"></i>
              </div>
              <div class="float-right">
                <p class="mb-0 text-right">Захиалагдсан</p>
                <div class="fluid-container">
                  <h3 class="font-weight-medium text-right mb-0">{{info.ordered_count}}</h3>
                </div>
              </div>
            </div>
            <p class="text-muted mt-3 mb-0">
              <i class="mdi mdi-bookmark-outline mr-1" aria-hidden="true"></i> Захиалагдсан төлөвт байгаа өрөөний тоо
            </p>
          </div>
        </div>
      </div>
      <div class="col-xl-3 col-lg-3 col-md-3 col-sm-6 grid-margin stretch-card">
        <div class="card card-statistics">
          <div class="card-body">
            <div class="clearfix">
              <div class="float-left">
                <i class="mdi mdi-poll-box text-success icon-lg"></i>
              </div>
              <div class="float-right">
                <p class="mb-0 text-right">Баталгаажсан</p>
                <div class="fluid-container">
                  <h3 class="font-weight-medium text-right mb-0">{{info.confirmed_count}}</h3>
                </div>
              </div>
            </div>
            <p class="text-muted mt-3 mb-0">
              <i class="mdi mdi-calendar mr-1" aria-hidden="true"></i> Одоогийн байдлаар баталгаажсан захиалгын тоо
            </p>
          </div>
        </div>
      </div>
      <div class="col-xl-3 col-lg-3 col-md-3 col-sm-6 grid-margin stretch-card">
        <div class="card card-statistics">
          <div class="card-body">
            <div class="clearfix">
              <div class="float-left">
                <i class="mdi mdi-account-location text-info icon-lg"></i>
              </div>
              <div class="float-right">
                <p class="mb-0 text-right">Багтаамж</p>
                <div class="fluid-container">
                  <h3 class="font-weight-medium text-right mb-0">{{info.person_count}}</h3>
                </div>
              </div>
            </div>
            <p class="text-muted mt-3 mb-0">
              <i class="mdi mdi-reload mr-1" aria-hidden="true"></i> Боломжит хүний багтаамж
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-5 grid-margin stretch-card">
        <!--weather card-->
        <div class="card card-weather">
          <div class="card-body">
            <div class="weather-date-location">
              <h3>{{todayWeather.dayOfWeekLong}}</h3>
              <p class="text-gray">
                <span class="weather-date">{{todayWeather.date}}</span>
                <span class="weather-location">Улаанбаатар, {{todayWeather.dayOfWeek}}</span>
              </p>
            </div>
            <div class="weather-data d-flex">
              <div class="mr-auto">
                <h4 class="display-3">
                  {{todayWeather.temperatureDay}}
                  <span class="symbol">&deg;</span>C
                </h4>
                <p>{{todayWeather.phenoDay}}</p>
              </div>
            </div>
          </div>
          <div class="card-body p-0">
            <div class="d-flex weakly-weather">
              <div
                class="weakly-weather-item"
                v-for="weather in forecasts"
                v-bind:key="weather.date"
              >
                <p class="mb-0">{{weather.dayOfWeek}}</p>
                <i v-bind:class="weather.imgClass"></i>
                <p class="mb-0">{{weather.temperatureDay}}°/{{weather.temperatureNight}}°</p>
              </div>
            </div>
          </div>
        </div>
        <!--weather card ends-->
      </div>
      <div class="col-lg-7 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Сүүлийн үйлдлүүд</h4>
            <div class="table-responsive">
              <table class="table">
                <thead>
                  <tr>
                    <th>Бүртгэсэн</th>
                    <th>Захиалгын дугаар</th>
                    <th>Үүсгэсэн огноо</th>
                    <th>Төлөв</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Jacob</td>
                    <td>53275531</td>
                    <td>12 May 2017</td>
                    <td>
                      <label class="badge badge-danger">Pending</label>
                    </td>
                  </tr>
                  <tr>
                    <td>Messsy</td>
                    <td>53275532</td>
                    <td>15 May 2017</td>
                    <td>
                      <label class="badge badge-warning">In progress</label>
                    </td>
                  </tr>
                  <tr>
                    <td>John</td>
                    <td>53275533</td>
                    <td>14 May 2017</td>
                    <td>
                      <label class="badge badge-info">Fixed</label>
                    </td>
                  </tr>
                  <tr>
                    <td>Peter</td>
                    <td>53275534</td>
                    <td>16 May 2017</td>
                    <td>
                      <label class="badge badge-success">Completed</label>
                    </td>
                  </tr>
                  <tr>
                    <td>Dave</td>
                    <td>53275535</td>
                    <td>20 May 2017</td>
                    <td>
                      <label class="badge badge-warning">In progress</label>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- content-wrapper ends -->
</template>

<script>
// import parser from 'xml2json'

export default {
  name: "Dashboard",
  data() {
    return {
      forecasts: [],
      info: {},
      todayWeather: {}
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      try {
        this.$store.dispatch("set_loading_status", true);

        const res = await fetch("/api/get-dashboard-data", {
          method: "GET"
        });
        const resJson = await res.json();
        console.log("response!");

        this.info = resJson.data;
        this.forecasts = resJson.forecasts;
        this.todayWeather = resJson.todayWeather;

        if (res.error) {
          console.log(res.error);
          this.$notify({
            title: "Алдаа",
            text: res.error,
            type: "error"
          });
        }
      } catch (err) {
        this.$notify({
          title: "Алдаа",
          text: err,
          type: "error"
        });
      } finally {
        this.$store.dispatch("set_loading_status", false);
      }
    }
  }
};
</script>