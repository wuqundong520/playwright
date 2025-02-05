/**
 * Copyright (c) Microsoft Corporation.
 *
 * Licensed under the Apache License, Version 2.0 (the 'License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const {blobServiceClient, gunzipAsync, deleteBlob} = require('./utils.js');
const {processDashboardV1} = require('./dashboard_v1.js');
const {processDashboardV2} = require('./dashboard_v2.js');
const {processDashboardRaw} = require('./dashboard_raw.js');

module.exports = async function(context) {
  // First thing we do - delete the blob.
  await deleteBlob('uploads', context.bindingData.name);

  // Get report data.
  const data = await gunzipAsync(context.bindings.newBlob);
  const report = JSON.parse(data.toString('utf8'));

  // Process dashboards one-by-one to limit max heap utilization.
  await processDashboardRaw(context, report);
  await processDashboardV1(context, report);
  // Disable V2 dashboard in favor of raw data.
  // await processDashboardV2(context, report);
}
