<template>
    <div class="py-4 container-fluid">
        <div class="row">
            <div class="col-12">
                <div class="card card-adjust mb-4">
                    <div class="card-header pb-0">
                        <div class="text-subheading">Data Contract</div>
                    </div>
                    <div class="card-body px-0 pt-0 pb-2">
                        <div class="table-responsive p-0 mb-1">
                            <table class="table align-items-center mb-0">
                                <thead>
                                    <tr>
                                    <th class="text-uppercase text-description text-color-grey font-weight-bolder opacity-7">
                                        Name
                                    </th>
                                    <th class="text-uppercase text-description text-color-grey font-weight-bolder opacity-7 ps-2">
                                        Position
                                    </th>
                                    <th class="text-center text-uppercase text-description text-color-grey font-weight-bolder opacity-7">
                                        Status
                                    </th>
                                    <th class="text-center text-uppercase text-description text-color-grey font-weight-bolder opacity-7">
                                        Date
                                    </th>
                                    <th class="text-uppercase text-description text-color-grey font-weight-bolder opacity-7 ps-2">
                                        Action
                                    </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                    <td>
                                        <div class="d-flex px-2 py-1">
                                            <div class="d-flex flex-column justify-content-center">
                                                <h6 class="mb-0">Nugroho Adi</h6>
                                                <p class="text-description text-description mb-0">
                                                adi@mail.com
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <p class="text-description font-weight-bold mb-0">Front End</p>
                                        <p class="text-description text-description mb-0">Salvus</p>
                                    </td>
                                    <td class="align-middle text-center">
                                        <badge color="success" variant="gradient" size="sm"
                                        >Online</badge
                                        >
                                    </td>
                                    <td class="align-middle text-center">
                                        <span class="text-description text-description"
                                        >23/04/18</span
                                        >
                                    </td>
                                    <td class="align-middle">
                                        <a
                                        href="javascript:;"
                                        class="text-description font-weight-bold text-description"
                                        data-toggle="tooltip"
                                        data-original-title="Edit user"
                                        >Edit</a
                                        >
                                    </td>
                                    </tr>
                                    <tr>
                                    <td>
                                        <div class="d-flex px-2 py-1">
                                            <div class="d-flex flex-column justify-content-center">
                                                <h6 class="mb-0">Abdul Richard</h6>
                                                <p class="text-description text-description mb-0">
                                                abdul@mail.com
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <p class="text-description font-weight-bold mb-0">Back End</p>
                                        <p class="text-description text-description mb-0">Salvus</p>
                                    </td>
                                    <td class="align-middle text-center">
                                        <badge color="secondary" variant="gradient" size="sm"
                                        >Offline</badge
                                        >
                                    </td>
                                    <td class="align-middle text-center">
                                        <span class="text-description text-description"
                                        >11/01/19</span
                                        >
                                    </td>
                                    <td class="align-middle">
                                        <a
                                        href="javascript:;"
                                        class="text-description font-weight-bold text-description"
                                        data-toggle="tooltip"
                                        data-original-title="Edit user"
                                        >Edit</a
                                        >
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
</template>

<script>
import badge from "@/components/badge/Badge"
export default {
    components: {
        badge
    }
}
</script>

<style>

</style>