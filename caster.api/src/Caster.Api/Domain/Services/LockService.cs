/*
Crucible
Copyright 2020 Carnegie Mellon University.
NO WARRANTY. THIS CARNEGIE MELLON UNIVERSITY AND SOFTWARE ENGINEERING INSTITUTE MATERIAL IS FURNISHED ON AN "AS-IS" BASIS. CARNEGIE MELLON UNIVERSITY MAKES NO WARRANTIES OF ANY KIND, EITHER EXPRESSED OR IMPLIED, AS TO ANY MATTER INCLUDING, BUT NOT LIMITED TO, WARRANTY OF FITNESS FOR PURPOSE OR MERCHANTABILITY, EXCLUSIVITY, OR RESULTS OBTAINED FROM USE OF THE MATERIAL. CARNEGIE MELLON UNIVERSITY DOES NOT MAKE ANY WARRANTY OF ANY KIND WITH RESPECT TO FREEDOM FROM PATENT, TRADEMARK, OR COPYRIGHT INFRINGEMENT.
Released under a MIT (SEI)-style license, please see license.txt or contact permission@sei.cmu.edu for full terms.
[DISTRIBUTION STATEMENT A] This material has been approved for public release and unlimited distribution.  Please see Copyright notice for non-US Government use and distribution.
Carnegie Mellon� and CERT� are registered in the U.S. Patent and Trademark Office by Carnegie Mellon University.
DM20-0181
*/

using System;
using System.Collections.Concurrent;
using System.Threading;
using Caster.Api.Utilities.Synchronization;

namespace Caster.Api.Domain.Services
{
    public interface ILockService
    {
        Object GetHostLock(Guid hostId);
        AsyncLock GetWorkspaceLock(Guid workspaceId);
        AsyncLock GetFileLock(Guid fileId);
    }

    public class LockService : ILockService
    {
        private ConcurrentDictionary<Guid, Object> _hostLocks = new ConcurrentDictionary<Guid, object>();
        private ConcurrentDictionary<Guid, AsyncLock> _workspaceLocks = new ConcurrentDictionary<Guid, AsyncLock>();
        private ConcurrentDictionary<Guid, AsyncLock> _fileLocks = new ConcurrentDictionary<Guid, AsyncLock>();

        public LockService()
        {
        }

        public Object GetHostLock(Guid hostId)
        {
            return _hostLocks.GetOrAdd(hostId, x => { return new Object(); });
        }

        public AsyncLock GetWorkspaceLock(Guid workspaceId)
        {
            return _workspaceLocks.GetOrAdd(workspaceId, x => { return new AsyncLock(); });
        }

        public AsyncLock GetFileLock(Guid fileId)
        {
            return _fileLocks.GetOrAdd(fileId, x => { return new AsyncLock(); });
        }
    }
}
